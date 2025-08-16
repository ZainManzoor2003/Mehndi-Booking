const nodemailer = require('nodemailer');

function createTransport() {
    const user = 'zainmanzoor2003@gmail.com'
    const pass = 'dkxn wkli ucds ovjl';
    if (!user || !pass) {
      // eslint-disable-next-line no-console
      console.warn('Gmail not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env');
    }
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
}

async function sendEmail({ to, subject, html, text }) {
  const transporter = createTransport();
  const defaultFrom =
   'zainmanzoor2003@gmail.com'
  await transporter.sendMail({ from: defaultFrom, to, subject, html, text });
}

module.exports = { sendEmail };


