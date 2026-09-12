import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { CV_DATA } from "../data/cv";
import {
  Mail,
  Github,
  Linkedin,
  FileDown,
  Download,
  Send,
  CheckCircle2,
} from "lucide-react";
import { motion } from "motion/react";
import { HangingSectionHeader } from "../components/HangingSectionHeader";
import {
  Form,
  Input,
  Button,
  ConfigProvider,
  theme as antdTheme,
  App as AntdApp,
} from "antd";

interface ContactSectionProps {
  onOpenResume: () => void;
}

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSuccess: (values: FormValues) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { message } = AntdApp.useApp();

  const handleFinish = async (values: FormValues) => {
    setIsSubmitting(true);
    // Simulate real request dispatch
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    onSuccess(values);
    message.success("Message sent! I will get back to you soon.");
    form.resetFields();
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
          placeholder="Tell me about your project, idea, or questions..."
          maxLength={1500}
          showCount
          className="font-sans text-xs sm:text-sm"
        />
      </Form.Item>

      {/* Submission Button */}
      <div className="pt-2 flex items-center">
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          size="large"
          className="h-11 px-8  text-xs font-semibold bg-black text-white hover:bg-zinc-800 border-black inline-flex items-center justify-center gap-2 rounded-none cursor-pointer"
        >
          <Send className="h-3.5 w-3.5" />
          <span>{isSubmitting ? "Sending..." : "Send message"}</span>
        </Button>
      </div>
    </Form>
  );
};

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenResume,
}) => {
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

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
        subtitle="Have a project in mind, an engineering role to discuss, or just want to connect? Drop a message below."
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
            className="bg-black text-white hover:bg-zinc-800 border border-black px-4 py-2 text-xs  font-semibold inline-flex items-center gap-2 shadow-xs transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>

          {/* Button 2: LinkedIn URL (White Background, Black Text) */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-black hover:bg-zinc-100 border border-zinc-300 px-4 py-2 text-xs  font-semibold inline-flex items-center gap-2 shadow-xs transition-colors"
          >
            <Linkedin className="h-4 w-4 text-black" />
            <span>LinkedIn</span>
          </a>

          {/* Button 3: Resume View Modal */}
          <button
            onClick={onOpenResume}
            className="bg-black text-white hover:bg-zinc-800 border border-black px-4 py-2 text-xs  font-semibold inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <FileDown className="h-4 w-4" />
            <span>Resume</span>
          </button>

          {/* Button 3b: Direct ATS CV Download */}
          <a
            href={CV_DATA.downloadUrl}
            download={CV_DATA.fileName}
            className="bg-white text-black hover:bg-zinc-100 border border-zinc-300 px-4 py-2 text-xs  font-semibold inline-flex items-center gap-2 shadow-xs transition-colors"
            title="Download ATS-compliant PDF"
          >
            <Download className="h-4 w-4 text-[var(--accent)]" />
            <span>Download CV (PDF)</span>
          </a>

          {/* Button 4: Direct Email Action (Redirects to mailto:) */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="bg-white text-black hover:bg-zinc-100 border border-zinc-300 px-4 py-2 text-xs  font-semibold inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
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
              <div className="border border-emerald-500/40 bg-emerald-500/10 p-6 sm:p-8 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
                  Message sent!
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
                  Thanks for reaching out,{" "}
                  <span className="font-semibold text-[var(--text-main)]">
                    {submittedData.name}
                  </span>
                  . I have received your message and will get back to you
                  shortly at{" "}
                  <span className=" text-xs">{submittedData.email}</span>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmittedData(null)}
                    className="px-5 py-2 text-xs  font-medium border border-[var(--border)] bg-[var(--surface)] text-[var(--text-main)] hover:border-[var(--text-main)] transition-colors cursor-pointer"
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
                    Fill out the form below and I&rsquo;ll get back to you as
                    soon as I can.
                  </p>
                </div>

                <ContactForm onSuccess={(values) => setSubmittedData(values)} />
              </div>
            )}
          </AntdApp>
        </ConfigProvider>
      </motion.div>
    </section>
  );
};
