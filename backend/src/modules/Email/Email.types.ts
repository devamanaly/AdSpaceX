export type EmailTemplate =
  | "welcome"
  | "verify-email"
  | "register-success";

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface SendTemplateInput {
  to: string;
  template: EmailTemplate;
  subject: string;
  data: Record<string, any>;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Template-specific data types
export interface WelcomeData {
  fullName: string;
  email: string;
  loginUrl: string;
}

export interface VerifyEmailData {
  fullName: string;
  verificationUrl: string;
  expiresInHours: number;
}