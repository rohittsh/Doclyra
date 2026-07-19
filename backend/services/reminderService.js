import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generic sender used by the automatic booking/cancellation/completion emails below.
// Fails silently (logs only) so a missing/broken email config never breaks the
// actual booking flow for the user.
const sendMail = async ({ to, subject, html }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return { success: false, message: 'Email is not configured yet' };
  }
  try {
    await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
    return { success: true };
  } catch (error) {
    // Log the full technical error for debugging, but never show raw SMTP
    // errors (credentials, server responses, etc.) to the end user.
    console.log('Email send failed:', error.message)

    let message = 'Unable to send email right now'
    if (error.code === 'EAUTH' || /Username and Password not accepted/i.test(error.message)) {
      message = 'Email login was rejected — check EMAIL_USER/EMAIL_PASS in the backend .env (Gmail requires a 16-character App Password, not your normal password)'
    } else if (error.code === 'EENVELOPE') {
      message = 'The recipient email address looks invalid'
    }

    return { success: false, message };
  }
};

// Manual "remind me" button (used by the existing /send-reminder endpoint)
export const sendAppointmentReminder = async ({ to, doctorName, slotDate, slotTime }) => {
  return sendMail({
    to,
    subject: 'Appointment Reminder',
    html: `<p>Hello,</p><p>This is a reminder for your appointment with <strong>${doctorName}</strong> on <strong>${slotDate}</strong> at <strong>${slotTime}</strong>.</p><p>Please arrive 10 minutes early.</p>`
  })
};

// Sent automatically right after a successful booking
export const sendAppointmentConfirmation = async ({ to, userName, doctorName, slotDate, slotTime }) => {
  return sendMail({
    to,
    subject: 'Appointment Confirmed',
    html: `<p>Hi ${userName},</p><p>Your appointment with <strong>${doctorName}</strong> on <strong>${slotDate}</strong> at <strong>${slotTime}</strong> has been booked successfully.</p><p>We look forward to seeing you!</p>`
  })
};

// Sent automatically when either the patient or the doctor cancels
export const sendAppointmentCancellation = async ({ to, userName, doctorName, slotDate, slotTime }) => {
  return sendMail({
    to,
    subject: 'Appointment Cancelled',
    html: `<p>Hi ${userName},</p><p>Your appointment with <strong>${doctorName}</strong> on <strong>${slotDate}</strong> at <strong>${slotTime}</strong> has been cancelled.</p><p>If this wasn't you, or you'd like to rebook, please visit the app.</p>`
  })
};

// Sent automatically when the doctor marks an appointment as completed
export const sendAppointmentCompletion = async ({ to, userName, doctorName, slotDate, slotTime }) => {
  return sendMail({
    to,
    subject: 'Appointment Completed',
    html: `<p>Hi ${userName},</p><p>Your appointment with <strong>${doctorName}</strong> on <strong>${slotDate}</strong> at <strong>${slotTime}</strong> has been marked as completed.</p><p>Thank you for using Doclyra. We hope you had a great experience!</p>`
  })
};
