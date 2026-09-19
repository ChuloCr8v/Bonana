import nodemailer from 'nodemailer';
import fs from 'node:fs';
import path from 'node:path';
import {
  ContactPayload,
  renderAdminNotificationEmail,
  renderUserConfirmationEmail,
} from './emailTemplates.js';

export interface SendResult {
  success: boolean;
  adminDelivered: boolean;
  userDelivered: boolean;
  provider: 'resend' | 'smtp' | 'local-archive';
  messageId: string;
  error?: string;
  notes?: string;
}

export interface InboundMessageRecord extends ContactPayload {
  id: string;
  createdAt: string;
  status: 'sent' | 'archived-no-credentials' | 'partial-delivery' | 'failed';
  provider: string;
  adminDelivered: boolean;
  userDelivered: boolean;
}

const MESSAGES_FILE = path.join(process.cwd(), 'data', 'messages.json');

function ensureDataDirectory() {
  const dir = path.dirname(MESSAGES_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function saveMessageToDisk(record: InboundMessageRecord): void {
  try {
    ensureDataDirectory();
    let existing: InboundMessageRecord[] = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      try {
        const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
        existing = JSON.parse(raw);
      } catch {
        existing = [];
      }
    }
    existing.unshift(record);
    // Keep last 100 messages locally
    if (existing.length > 100) existing = existing.slice(0, 100);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
  } catch (err) {
    console.error('[EmailService] Failed to save message to disk:', err);
  }
}

export function getStoredMessages(): InboundMessageRecord[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('[EmailService] Failed to read messages from disk:', err);
  }
  return [];
}

/**
 * Checks which email dispatch strategy is configured.
 */
export function getEmailProviderConfig(): {
  provider: 'resend' | 'smtp' | 'local-archive';
  adminEmail: string;
  fromEmail: string;
  details: string;
} {
  const adminEmail = process.env.CONTACT_RECEIVER_EMAIL || 'chulocr8v@gmail.com';

  if (process.env.RESEND_API_KEY) {
    return {
      provider: 'resend',
      adminEmail,
      fromEmail: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      details: 'Resend API (Active)',
    };
  }

  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    return {
      provider: 'smtp',
      adminEmail,
      fromEmail: process.env.SMTP_FROM || `Bonaventure Portfolio <${process.env.SMTP_USER}>`,
      details: `SMTP (${process.env.SMTP_HOST})`,
    };
  }

  return {
    provider: 'local-archive',
    adminEmail,
    fromEmail: 'noreply@chulocr8v.github.io',
    details: 'Local archive mode (Simulated delivery, saved to data/messages.json)',
  };
}

/**
 * Sends email via Resend REST API (3,000 free emails/month).
 */
async function sendViaResend(
  to: string,
  subject: string,
  html: string,
  text: string,
  replyTo?: string
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        text,
        reply_to: replyTo,
      }),
    });

    const data = (await res.json()) as { id?: string; message?: string; name?: string };

    if (!res.ok) {
      return { ok: false, error: data.message || `Resend error status ${res.status}` };
    }

    return { ok: true, id: data.id };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Network error contacting Resend' };
  }
}

/**
 * Sends email via SMTP (e.g. Gmail App Password, Brevo, Sendgrid).
 */
async function sendViaSmtp(
  to: string,
  subject: string,
  html: string,
  text: string,
  replyTo?: string
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const from = process.env.SMTP_FROM || `Bonaventure Portfolio <${process.env.SMTP_USER}>`;

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
      replyTo,
    });
    return { ok: true, id: info.messageId };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'SMTP delivery failed' };
  }
}

/**
 * Main dispatcher: sends both the owner notification and the user confirmation.
 */
export async function dispatchContactEmails(
  payload: ContactPayload
): Promise<SendResult> {
  const messageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const config = getEmailProviderConfig();

  const adminEmailContent = renderAdminNotificationEmail(payload);
  const userEmailContent = renderUserConfirmationEmail(payload);

  let adminDelivered = false;
  let userDelivered = false;
  let errorMsg: string | undefined;
  let notes: string | undefined;

  if (config.provider === 'resend') {
    // 1. Send notification to Bonaventure
    const adminRes = await sendViaResend(
      config.adminEmail,
      adminEmailContent.subject,
      adminEmailContent.html,
      adminEmailContent.text,
      payload.email
    );
    adminDelivered = adminRes.ok;
    if (!adminRes.ok) {
      errorMsg = `Admin notify error: ${adminRes.error}`;
      console.error('[EmailService] Resend admin notification error:', adminRes.error);
    }

    // 2. Send confirmation auto-reply to User
    const userRes = await sendViaResend(
      payload.email,
      userEmailContent.subject,
      userEmailContent.html,
      userEmailContent.text,
      config.adminEmail
    );
    userDelivered = userRes.ok;
    if (!userRes.ok) {
      console.warn('[EmailService] Resend user confirmation error:', userRes.error);
      notes = `User confirmation note: ${userRes.error}`;
    }
  } else if (config.provider === 'smtp') {
    // 1. Send notification to Bonaventure
    const adminRes = await sendViaSmtp(
      config.adminEmail,
      adminEmailContent.subject,
      adminEmailContent.html,
      adminEmailContent.text,
      payload.email
    );
    adminDelivered = adminRes.ok;
    if (!adminRes.ok) {
      errorMsg = `Admin notify error: ${adminRes.error}`;
      console.error('[EmailService] SMTP admin notification error:', adminRes.error);
    }

    // 2. Send confirmation auto-reply to User
    const userRes = await sendViaSmtp(
      payload.email,
      userEmailContent.subject,
      userEmailContent.html,
      userEmailContent.text,
      config.adminEmail
    );
    userDelivered = userRes.ok;
    if (!userRes.ok) {
      console.warn('[EmailService] SMTP user confirmation error:', userRes.error);
      notes = `User confirmation note: ${userRes.error}`;
    }
  } else {
    // Local-archive simulation mode: logs both emails cleanly to the console
    adminDelivered = true;
    userDelivered = true;
    notes =
      'Message saved locally and simulated. To enable live outgoing email, provide RESEND_API_KEY (free 3,000 emails/mo) or SMTP credentials in your environment.';
    
    console.log('\n================== [CONTACT FORM INQUIRY RECEIVED] ==================');
    console.log(`From:    ${payload.name} <${payload.email}>`);
    console.log(`To:      Nkematu Bonaventure <${config.adminEmail}>`);
    console.log(`Subject: ${payload.subject}`);
    console.log('--- Message Content ---');
    console.log(payload.message);
    console.log('--- Confirmation Prepared for User ---');
    console.log(`Subject: ${userEmailContent.subject}`);
    console.log('====================================================================\n');
  }

  // Always persist inquiry to disk so messages are never lost
  const record: InboundMessageRecord = {
    id: messageId,
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
    createdAt: payload.timestamp || new Date().toISOString(),
    ip: payload.ip,
    provider: config.provider,
    adminDelivered,
    userDelivered,
    status:
      adminDelivered && userDelivered
        ? 'sent'
        : config.provider === 'local-archive'
        ? 'archived-no-credentials'
        : adminDelivered
        ? 'partial-delivery'
        : 'failed',
  };

  saveMessageToDisk(record);

  return {
    success: adminDelivered || config.provider === 'local-archive',
    adminDelivered,
    userDelivered,
    provider: config.provider,
    messageId,
    error: errorMsg,
    notes,
  };
}
