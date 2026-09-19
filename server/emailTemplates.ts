export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp?: string;
  ip?: string;
}

/**
 * Escapes HTML characters to prevent XSS in email bodies.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates the notification email HTML sent to Nkematu Bonaventure.
 */
export function renderAdminNotificationEmail(payload: ContactPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeSubject = escapeHtml(payload.subject);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, '<br/>');
  const dateStr = payload.timestamp || new Date().toUTCString();

  const emailSubject = `[Portfolio Inquiry] ${payload.subject} — from ${payload.name}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailSubject}</title>
</head>
<body style="margin:0;padding:0;background-color:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f4f4f5;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#09090b;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#18181b;border:1px solid #27272a;border-radius:6px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.5);">
          <!-- Header Bar -->
          <tr>
            <td style="padding:24px 28px;border-bottom:1px solid #27272a;background-color:#141417;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#a1a1aa;">
                      PORTFOLIO GATEWAY · NEW INQUIRY
                    </div>
                    <div style="font-size:18px;font-weight:700;color:#ffffff;margin-top:4px;">
                      ${safeSubject}
                    </div>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="display:inline-block;padding:4px 10px;font-size:11px;font-family:monospace;background-color:#27272a;color:#e4e4e7;border-radius:4px;">
                      Received
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Meta Box -->
          <tr>
            <td style="padding:20px 28px;background-color:#1c1c20;border-bottom:1px solid #27272a;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom:8px;">
                    <span style="font-size:12px;color:#71717a;display:inline-block;width:90px;text-transform:uppercase;font-weight:600;letter-spacing:0.5px;">From:</span>
                    <strong style="font-size:14px;color:#ffffff;">${safeName}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:8px;">
                    <span style="font-size:12px;color:#71717a;display:inline-block;width:90px;text-transform:uppercase;font-weight:600;letter-spacing:0.5px;">Email:</span>
                    <a href="mailto:${safeEmail}" style="font-size:14px;color:#38bdf8;text-decoration:none;font-family:monospace;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="font-size:12px;color:#71717a;display:inline-block;width:90px;text-transform:uppercase;font-weight:600;letter-spacing:0.5px;">Time:</span>
                    <span style="font-size:12px;color:#a1a1aa;font-family:monospace;">${dateStr}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding:28px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#71717a;margin-bottom:12px;">
                MESSAGE BODY
              </div>
              <div style="background-color:#0f0f11;border:1px solid #27272a;border-left:3px solid #38bdf8;padding:18px 20px;border-radius:4px;color:#e4e4e7;font-size:14px;line-height:1.65;white-space:normal;word-break:break-word;">
                ${safeMessage}
              </div>

              <!-- Action Button -->
              <div style="margin-top:28px;text-align:left;">
                <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(payload.subject)}" style="display:inline-block;background-color:#ffffff;color:#000000;font-size:13px;font-weight:600;text-decoration:none;padding:10px 22px;border-radius:4px;letter-spacing:0.3px;">
                  Reply directly to ${safeName} &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 28px;background-color:#121215;border-top:1px solid #27272a;font-size:12px;color:#71717a;text-align:center;">
              Sent from Nkematu Bonaventure's Portfolio Contact Form &bull; 
              <a href="https://chulocr8v.github.io" style="color:#a1a1aa;text-decoration:none;">chulocr8v.github.io</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
[NEW PORTFOLIO INQUIRY]
Subject: ${payload.subject}
From: ${payload.name} (${payload.email})
Date: ${dateStr}

Message:
--------------------------------------------------
${payload.message}
--------------------------------------------------

Reply directly to: ${payload.email}
Sent via Nkematu Bonaventure Portfolio (https://chulocr8v.github.io)
  `.trim();

  return { subject: emailSubject, html, text };
}

/**
 * Generates the user auto-reply confirmation email HTML sent to the sender.
 */
export function renderUserConfirmationEmail(payload: ContactPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const safeName = escapeHtml(payload.name);
  const safeSubject = escapeHtml(payload.subject);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, '<br/>');

  const emailSubject = `Message received: "${payload.subject}" — Nkematu Bonaventure`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailSubject}</title>
</head>
<body style="margin:0;padding:0;background-color:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f4f4f5;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#09090b;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#18181b;border:1px solid #27272a;border-radius:6px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.5);">
          <!-- Header Banner -->
          <tr>
            <td style="padding:28px 32px 20px 32px;background-color:#141417;border-bottom:1px solid #27272a;">
              <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#38bdf8;margin-bottom:6px;">
                CONFIRMATION
              </div>
              <div style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">
                Nkematu Bonaventure
              </div>
              <div style="font-size:13px;color:#a1a1aa;margin-top:2px;">
                Engineering Team Lead &bull; Full-Stack Developer
              </div>
            </td>
          </tr>

          <!-- Confirmation Body -->
          <tr>
            <td style="padding:32px;">
              <p style="font-size:15px;line-height:1.6;color:#e4e4e7;margin:0 0 16px 0;">
                Hi <strong style="color:#ffffff;">${safeName}</strong>,
              </p>
              <p style="font-size:14px;line-height:1.65;color:#a1a1aa;margin:0 0 20px 0;">
                Thank you for reaching out! I have received your message regarding <strong style="color:#ffffff;">&ldquo;${safeSubject}&rdquo;</strong> and will review it shortly.
              </p>
              <p style="font-size:14px;line-height:1.65;color:#a1a1aa;margin:0 0 24px 0;">
                I typically respond within <strong style="color:#ffffff;">24 to 48 hours</strong>. In the meantime, here is a copy of what you submitted for your records:
              </p>

              <!-- Copy of Submitted Inquiry -->
              <div style="background-color:#0f0f11;border:1px solid #27272a;border-left:3px solid #38bdf8;padding:16px 20px;border-radius:4px;margin-bottom:28px;">
                <div style="font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:#71717a;margin-bottom:8px;">
                  Subject: ${safeSubject}
                </div>
                <div style="font-size:13px;line-height:1.6;color:#d4d4d8;">
                  ${safeMessage}
                </div>
              </div>

              <!-- Quick Links & Contact -->
              <div style="background-color:#1c1c20;border:1px solid #27272a;border-radius:4px;padding:16px 20px;margin-bottom:28px;">
                <div style="font-size:12px;font-weight:600;color:#ffffff;margin-bottom:10px;">
                  Connect with me in the meantime:
                </div>
                <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding-right:16px;">
                      <a href="https://github.com/chulocr8v" style="color:#38bdf8;font-size:13px;text-decoration:none;">GitHub &rarr;</a>
                    </td>
                    <td style="padding-right:16px;">
                      <a href="https://linkedin.com/in/chulocr8v" style="color:#38bdf8;font-size:13px;text-decoration:none;">LinkedIn &rarr;</a>
                    </td>
                    <td>
                      <a href="https://chulocr8v.github.io" style="color:#38bdf8;font-size:13px;text-decoration:none;">Portfolio &rarr;</a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Sign-off -->
              <div style="font-size:14px;line-height:1.6;color:#e4e4e7;">
                Warm regards,<br/>
                <strong style="color:#ffffff;">Nkematu Bonaventure (Bona)</strong><br/>
                <span style="font-size:12px;color:#71717a;">Engineering Team Lead &bull; Lagos, Nigeria</span>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 32px;background-color:#121215;border-top:1px solid #27272a;font-size:11px;color:#71717a;text-align:center;line-height:1.5;">
              You received this automated receipt because you submitted the contact form at 
              <a href="https://chulocr8v.github.io" style="color:#a1a1aa;text-decoration:none;">chulocr8v.github.io</a>.<br/>
              If this was not you, please disregard this email.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
Hi ${payload.name},

Thank you for reaching out! I have received your message regarding "${payload.subject}".

I typically review inquiries and respond within 24 to 48 hours.

Here is a copy of your message:
--------------------------------------------------
Subject: ${payload.subject}

${payload.message}
--------------------------------------------------

Connect with me:
- GitHub: https://github.com/chulocr8v
- LinkedIn: https://linkedin.com/in/chulocr8v
- Portfolio: https://chulocr8v.github.io

Warm regards,
Nkematu Bonaventure
Engineering Team Lead | Full-Stack Developer
  `.trim();

  return { subject: emailSubject, html, text };
}
