const sgMail = require("@sendgrid/mail");
const config = require("config");
sgMail.setApiKey(config.get("emailKey"));

sendEmail = async (clientEmail, jwtToken, type) => {
  const msg = {
    to: clientEmail,
    from: "test@example.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: ` <div><p>Please click on the link to verify your account--------------</p> <a herf="http://localhost:3000/auth/verify/${jwtToken}">http://localhost:3000/auth/verify/${jwtToken}/?type=${type}</a></div>`
  };
  const result = await sgMail.send(msg);
  return result;
};

module.exports = sendEmail;
