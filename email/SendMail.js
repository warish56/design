const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

sendEmail = async (clientEmail, jwtToken) => {
  const msg = {
    to: clientEmail,
    from: "test@example.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: ` <div><p>Please click on the link to verify your account--------------</p> <a herf="http://localhost:3000/auth/verify/${jwtToken}">http://localhost:3000/auth/verify/${jwtToken}</a></div>`
  };
  const result = await sgMail.send(msg);
  return result;
};

module.exports = sendEmail;
