const sgMail = require("@sendgrid/mail");
const config = require("config");
sgMail.setApiKey(config.get("emailKey"));

sendVerifyEmail = async (clientEmail, jwtToken, type) => {
  const msg = {
    to: clientEmail,
    from: "test@example.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: ` <div><p>Please click on the link to verify your account--------------</p> <a herf="http://localhost:3000/auth/verify/${jwtToken}">http://localhost:3000/auth/verify/${jwtToken}?type=${type}</a></div>`
  };
  const result = await sgMail.send(msg);
  return result;
};

sendResetEmail = async (clientEmail, jwtToken, type) => {
  const msg = {
    to: clientEmail,
    from: "test@example.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: ` <div><p>Please click on the link to Reset Your Password--------------</p> <a herf="http://localhost:3000/auth/verify/${jwtToken}">http://localhost:3000/auth/reset_pass/${jwtToken}</a></div>`
  };
  const result = await sgMail.send(msg);
  return result;
};

module.exports.sendVerifyEmail = sendVerifyEmail;
module.exports.sendResetEmail = sendResetEmail;
