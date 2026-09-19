import {
  App as AntdApp,
  Button,
  ConfigProvider,
  Form,
  Input,
  theme as antdTheme,
} from "antd";
import {
  CheckCircle2,
  FileDown,
  Github,
  Linkedin,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { HangingSectionHeader } from "../components/HangingSectionHeader";
import { PERSONAL_INFO } from "../data/portfolioData";

interface ContactSectionProps {
  onOpenResume: () => void;
}

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SubmissionResponse {
  success: boolean;
  messageId?: string;
  provider?: string;
  adminDelivered?: boolean;
  userDelivered?: boolean;
  notes?: string;
  error?: string;
}

interface ContactFormProps {
  onSuccess: (values: FormValues, response: SubmissionResponse) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { message } = AntdApp.useApp();

  const handleFinish = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data: SubmissionResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to deliver message. Please try again.");
      }

      onSuccess(values, data);
      message.success("Message dispatched successfully! A confirmation receipt has been generated.");
      form.resetFields();
    } catch (err: any) {
      console.error("[ContactForm] Submission failed:", err);
      message.error(err?.message || "Could not deliver your message right now. Please try again or reach out directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      requiredMark={false}
      className="w-full space-y-1"
    >
      {/* 2-Column Responsive Grid for Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <Form.Item
          name="name"
          label={
            <span className="text-xs font-medium text-[var(--text-main)]">
              Name or organization *
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please enter your name or organization",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Your name or company"
            className="font-sans text-xs sm:text-sm"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={
            <span className="text-xs font-medium text-[var(--text-main)]">
              Email address *
            </span>
          }
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email format" },
          ]}
        >
          <Input
            size="large"
            placeholder="you@example.com"
            className="font-sans text-xs sm:text-sm"
          />
        </Form.Item>
      </div>

      {/* Full-Width Subject Input */}
      <Form.Item
        name="subject"
        label={
          <span className="text-xs font-medium text-[var(--text-main)]">
            Subject *
          </span>
        }
        rules={[{ required: true, message: "Please enter a subject" }]}
      >
        <Input
          size="large"
          placeholder="What is this regarding?"
          className="font-sans text-xs sm:text-sm"
        />
      </Form.Item>

      {/* Full-Width Message Text Area */}
      <Form.Item
        name="message"
        label={
          <span className="text-xs font-medium text-[var(--text-main)]">
            Your message *
          </span>
        }
        rules={[{ required: true, message: "Please write your message" }]}
      >
        <Input.TextArea
          rows={4}
          placeholder="Tell me about your project, idea, role, or questions..."
          maxLength={1500}
          showCount
          className="font-sans text-xs sm:text-sm"
        />
      </Form.Item>

      {/* Submission Button */}
      <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          size="large"
          className="h-11 px-8 text-xs font-semibold !bg-black dark:!bg-white !text-white dark:!text-black hover:!bg-zinc-800 dark:hover:!bg-zinc-200 !border-black dark:!border-white inline-flex items-center justify-center gap-2 rounded-none cursor-pointer shadow-xs transition-colors"
        >
          <Send className="h-3.5 w-3.5 text-white dark:text-black" />
          <span>{isSubmitting ? "Dispatching..." : "Send message"}</span>
        </Button>
        <span className="text-[11px] text-[var(--text-muted)] font-mono">
          Auto-confirmation receipt will be sent to your email
        </span>
      </div>
    </Form>
  );
};

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenResume,
}) => {
  const [submittedData, setSubmittedData] = useState<{
    values: FormValues;
    response: SubmissionResponse;
  } | null>(null);

  // Synchronize Ant Design theme algorithm with application dark/light state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="w-full bg-[var(--surface)]">
      {/* Centralized Section Title Hanging on 2 Strings */}
      <HangingSectionHeader
        title="Get in touch"
        subtitle="Have a project, engineering role, or collaboration in mind? I'd be happy to connect."
        as="h2"
      />

      {/* Alternating Color Quick Action Buttons (GitHub, LinkedIn, Resume, Direct Email) */}
      <div className="p-5 sm:p-6 bg-[var(--surface-alt)]/40 border-b border-[var(--border)]">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Button 1: GitHub URL (Black Background, White Text) */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="bg-black text-white hover:bg-zinc-800 border border-black px-4 py-2 text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>

          {/* Button 2: LinkedIn URL (White Background, Black Text) */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-black hover:bg-zinc-100 border border-zinc-300 px-4 py-2 text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-colors"
          >
            <Linkedin className="h-4 w-4 text-black" />
            <span>LinkedIn</span>
          </a>

          {/* Button 3: Resume View Modal */}
          <button
            onClick={onOpenResume}
            className="bg-black text-white hover:bg-zinc-800 border border-black px-4 py-2 text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <FileDown className="h-4 w-4" />
            <span>Resume</span>
          </button>

          {/* Button 4: Direct Email Action (Redirects to mailto:) */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="bg-white text-black hover:bg-zinc-100 border border-zinc-300 px-4 py-2 text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            title="Open email client"
          >
            <Mail className="h-4 w-4 text-black" />
            <span>{PERSONAL_INFO.email}</span>
          </a>
        </div>
      </div>

      {/* Human-Friendly Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="p-6 sm:p-10 max-w-3xl mx-auto w-full"
      >
        <ConfigProvider
          theme={{
            algorithm: isDark
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
            token: {
              colorPrimary: isDark ? "#ffffff" : "#000000",
              colorPrimaryHover: isDark ? "#e4e4e7" : "#27272a",
              borderRadius: 0,
              fontFamily: "inherit",
              colorBgContainer: isDark ? "#18181b" : "#ffffff",
              colorBorder: isDark ? "#27272a" : "#d0d7de",
            },
          }}
        >
          <AntdApp>
            {submittedData ? (
              <div className="border border-emerald-500/40 bg-emerald-500/5 p-6 sm:p-8 space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
                    Message Dispatched Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
                    Thank you,{" "}
                    <span className="font-semibold text-[var(--text-main)]">
                      {submittedData.values.name}
                    </span>
                    . Both an owner notification and a confirmation receipt have been generated.
                  </p>
                </div>

                {/* Structured Dual Delivery Status Card */}
                <div className="bg-[var(--surface-alt)]/50 border border-[var(--border)] p-4 sm:p-5 space-y-3.5 text-xs">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
                    <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                      Gateway Transmission Status
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <Sparkles className="h-3 w-3" />
                      {submittedData.response.provider === "resend"
                        ? "Resend API Active"
                        : submittedData.response.provider === "smtp"
                        ? "SMTP Relay Active"
                        : "Archived & Simulation Active"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[var(--text-main)] font-medium">
                          Notification for Nkematu Bonaventure
                        </strong>
                        <p className="text-[11px] text-[var(--text-muted)] font-mono">
                          Destination: {PERSONAL_INFO.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[var(--text-main)] font-medium">
                          Confirmation auto-reply sent to you
                        </strong>
                        <p className="text-[11px] text-[var(--text-muted)] font-mono">
                          Destination: {submittedData.values.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Message reference preview */}
                  <div className="pt-2 border-t border-[var(--border)]">
                    <div className="text-[11px] text-[var(--text-muted)] mb-1 font-mono">
                      Subject: &ldquo;{submittedData.values.subject}&rdquo;
                    </div>
                    <div className="p-3 bg-[var(--surface)] border border-[var(--border)] text-[11px] text-[var(--text-muted)] leading-relaxed italic line-clamp-3">
                      &ldquo;{submittedData.values.message}&rdquo;
                    </div>
                  </div>

                  {submittedData.response.notes && (
                    <div className="text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/10 p-2 border border-amber-500/20 font-mono">
                      ℹ️ {submittedData.response.notes}
                    </div>
                  )}
                </div>

                <div className="text-center pt-1">
                  <button
                    onClick={() => setSubmittedData(null)}
                    className="px-6 py-2.5 text-xs font-semibold border border-[var(--border)] bg-[var(--surface)] text-[var(--text-main)] hover:border-[var(--text-main)] transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-b border-[var(--border)] pb-3">
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)]">
                    Send a message
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Fill out the form below. A notification will be sent to Bonaventure, and an automated confirmation receipt will be delivered to you.
                  </p>
                </div>

                <ContactForm
                  onSuccess={(values, response) =>
                    setSubmittedData({ values, response })
                  }
                />
              </div>
            )}
          </AntdApp>
        </ConfigProvider>
      </motion.div>
    </section>
  );
};
