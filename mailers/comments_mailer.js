const nodemailer = require("../config/nodemailer");

module.exports.newComment = (comment) => {
  const html = nodemailer.renderTemplate(
    { comment: comment },
    "comments/new_comment.ejs"
  );
  nodemailer.transporter.sendMail(
    {
      from: "socialApp@mail.com",
      to: comment.user.email,
      subject: "New Comment is Published",
      html: html,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail: " + err);
        return;
      }
      // console.log("message send: " + info);
      return;
    }
  );
};
