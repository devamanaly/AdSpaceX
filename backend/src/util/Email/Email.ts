
import nodemailer, { type Transporter } from "nodemailer";

const globalForEmail = globalThis as unknown as {
  transporter: Transporter | undefined;
};

export const transporter =
  globalForEmail.transporter ??
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForEmail.transporter = transporter;
}

// Verify connection on startup (development only)
if (process.env.NODE_ENV === "development") {
  transporter.verify((error) => {
    if (error) {
      console.error(" Email transporter failed:", error.message);
    } else {
      console.log(" Email transporter ready");
    }
  });
}
