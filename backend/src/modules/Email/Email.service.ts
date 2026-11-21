import { transporter } from "../../util/Email/Email";
import { renderTemplate } from "../../util/Email/EmailTemplate";
import { emailConfig } from "../../config/email.config";
import type {
  SendEmailInput,
  SendTemplateInput,
  EmailResult,
  WelcomeData,
  VerifyEmailData,
} from "./Email.types";

export class EmailService {

  /**
   * Low-level: Send a raw email
   */
  async sendEmail(input: SendEmailInput): Promise<EmailResult> {
    try {
      const info = await transporter.sendMail({
        from: `"${emailConfig.from.name}" <${emailConfig.from.address}>`,
        to: input.to,
        replyTo: emailConfig.replyTo,
        subject: input.subject,
        html: input.html,
        text: input.text,
      });

      console.log(`✅ Email sent to ${input.to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error: any) {
      console.error(`❌ Email failed to ${input.to}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Medium-level: Render template + send
   */
  async sendTemplate(input: SendTemplateInput): Promise<EmailResult> {
    try {
      const html = await renderTemplate(input.template, input.data);

      return await this.sendEmail({
        to: input.to,
        subject: input.subject,
        html,
      });
    } catch (error: any) {
      console.error(`❌ Template render failed (${input.template}):`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * High-level: Send welcome email
   */
  async sendWelcome(to: string, data: WelcomeData): Promise<EmailResult> {
    return this.sendTemplate({
      to,
      template: "welcome",
      subject: "Welcome to AdSpaceX - Let's Get Started!",
      data,
    });
  }

  /**
   * High-level: Send verification email
   */
  async sendVerificationEmail(
    to: string,
    data: VerifyEmailData
  ): Promise<EmailResult> {
    return this.sendTemplate({
      to,
      template: "verify-email",
      subject: "Verify Your Email - AdSpaceX",
      data,
    });
  }
}

export const emailService = new EmailService();