import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendAppointmentReminder = async ({ to, doctorName, slotDate, slotTime }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return { success: false, message: 'Email credentials not configured' };
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Appointment Reminder',
    html: `<p>Hello,</p><p>This is a reminder for your appointment with <strong>${doctorName}</strong> on <strong>${slotDate}</strong> at <strong>${slotTime}</strong>.</p><p>Please arrive 10 minutes early.</p>`
  };

  await transporter.sendMail(mailOptions);
  return { success: true };
};
