import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", // or 'Outlook', or use custom SMTP config
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendNotificationEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  await transporter.sendMail({
    from: `"Pressing Service" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};
