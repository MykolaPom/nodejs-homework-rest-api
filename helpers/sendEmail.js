const nodemailer = require("nodemailer");

const { EMAIL_USER, EMAIL_PASS } = process.env;

const sendEmail = async() => {
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  };

  const transporter = nodemailer.createTransport(config);

  try {
    const email = {
      from: "nickostudent@meta.ua",
      to: "nickostudent@meta.ua",
      subject: "Email confirmation",
      html: `Please, confirm your email`,
    };

    await transporter.sendMail(email);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
