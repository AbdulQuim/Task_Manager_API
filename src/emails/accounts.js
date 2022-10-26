const sgm = require("@sendgrid/mail");

sgm.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeMail = (mail, name) => {
  sgm.send({
    to: mail,
    from: "farhadbhai1322@gmail.com",
    Subject: "Email Testing",
    text: `Welcome aboard, ${name}`,
  });
};

const sendMailOnDelettion = (mail, name) => {
  sgm.send({
    to: mail,
    from: "farhadbhai1322@gmail.com",
    Subject: "Email Testing",
    text: `GoodBye, ${name} Before u go can u suggest whch things might improve our service`,
  });
};

module.exports = {
  sendWelcomeMail,
  sendMailOnDelettion,
};
