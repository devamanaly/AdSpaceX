export const emailConfig = {
    from: {
      name: process.env.EMAIL_FROM_NAME || "AdSpaceX",
      address: process.env.EMAIL_USER,   // ← use the Gmail account, not noreply@
    },
    replyTo: process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER,
    appUrl: process.env.APP_URL || "http://localhost:5000",
    appName: "AdSpaceX",
    supportEmail: process.env.EMAIL_USER,
  };