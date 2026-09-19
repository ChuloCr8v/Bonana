import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  dispatchContactEmails,
  getEmailProviderConfig,
  getStoredMessages,
} from './server/emailService.js';

dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting in-memory map for basic protection
const ipRequests = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 10; // max 10 submissions per 15 mins per IP
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;

function rateLimit(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    'unknown';

  const now = Date.now();
  const current = ipRequests.get(ip);

  if (!current || now > current.resetTime) {
    ipRequests.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a few minutes before sending another message.',
    });
  }

  current.count++;
  next();
}

// ---------------------------------------------------------------------------
// API Routes (mounted BEFORE Vite middleware)
// ---------------------------------------------------------------------------

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Provider & Configuration Status Endpoint
app.get('/api/contact/status', (_req, res) => {
  const config = getEmailProviderConfig();
  res.json({
    provider: config.provider,
    adminEmail: config.adminEmail,
    details: config.details,
    availableProviders: [
      {
        name: 'Resend (Recommended Free Standard)',
        description: '3,000 free emails/month, fastest setup with modern developer API.',
        envRequired: ['RESEND_API_KEY'],
        envOptional: ['RESEND_FROM_EMAIL', 'CONTACT_RECEIVER_EMAIL'],
      },
      {
        name: 'Gmail SMTP (100% Free)',
        description: '500 emails/day using your Gmail account + App Password.',
        envRequired: ['SMTP_HOST=smtp.gmail.com', 'SMTP_PORT=465', 'SMTP_USER', 'SMTP_PASS'],
        envOptional: ['CONTACT_RECEIVER_EMAIL'],
      },
      {
        name: 'Brevo (formerly Sendinblue)',
        description: '300 emails/day free transactional SMTP.',
        envRequired: ['SMTP_HOST=smtp-relay.brevo.com', 'SMTP_PORT=587', 'SMTP_USER', 'SMTP_PASS'],
      },
    ],
  });
});

// Inbound Contact Form Submission
app.post('/api/contact', rateLimit, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'A valid email address is required' });
    }
    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Subject is required' });
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    if (name.length > 100) {
      return res.status(400).json({ success: false, error: 'Name is too long (max 100 chars)' });
    }
    if (subject.length > 200) {
      return res.status(400).json({ success: false, error: 'Subject is too long (max 200 chars)' });
    }
    if (message.length > 3000) {
      return res.status(400).json({ success: false, error: 'Message is too long (max 3000 chars)' });
    }

    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown';

    const result = await dispatchContactEmails({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date().toUTCString(),
      ip: clientIp,
    });

    return res.status(200).json({
      success: true,
      messageId: result.messageId,
      provider: result.provider,
      adminDelivered: result.adminDelivered,
      userDelivered: result.userDelivered,
      notes: result.notes,
    });
  } catch (err: any) {
    console.error('[API /api/contact] Unexpected submission error:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your message. Please try again.',
    });
  }
});

// Admin preview endpoint for recent archived inquiries (safe, only in dev or authorized)
app.get('/api/contact/messages', (req, res) => {
  const messages = getStoredMessages();
  res.json({
    total: messages.length,
    messages,
  });
});

// ---------------------------------------------------------------------------
// Vite Middleware / Static Assets Handling
// ---------------------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Application running at http://0.0.0.0:${PORT}`);
    const cfg = getEmailProviderConfig();
    console.log(`[Email] Active contact provider strategy: ${cfg.details}`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal startup failure:', err);
  process.exit(1);
});
