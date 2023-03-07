import express from "express";
import mailer from "nodemailer";
const helpRouter = express.Router();

helpRouter.get("/", (req, res) => {
  if (req.session.username) {
    res.render("help", { logged: true });
  } else {
    res.render("help", { logged: false });
  }
});

helpRouter.post("/", (req, res) => {
  const { query, username } = req.body;
  const transport = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "minewsorganization@gmail.com",
      pass: "xfoywfxbedqzwjcl",
    },
  });
  const mailoptions = {
    from: "minewsorganization@gmail.com",
    to: "miteshsurti93@gmail.com",
    subject: "news from nodemailer",
    html: `${username}: ${query}`,
  };
  transport.sendMail(mailoptions, (err, info) => {
    if (err) throw err;
    console.log("Email sent: ", info.response);
  });
  res.redirect("/");
});

helpRouter.get("*", (req, res) => {
  res.render("error");
});

export default helpRouter;
