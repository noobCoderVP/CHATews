import express from "express";
// var cron = require("node-cron");
import email from "../models/emails.js";
import user from "../models/user.js";
import cron from "node-cron";
const emailRouter = express.Router();
import sendEmail from "../sendMail.js";

emailRouter.get("/", (req, res) => {
  if (req.session.username) {
    res.render("email", { logged: true, invalid: false });
  } else {
    res.render("email", { logged: false, invalid: false });
  }
});

emailRouter.post("/", (req, res) => {
  if (req.session.username) {
    const { username, password, interval, keywords, time } = req.body;
    user
      .findOne({
        where: {
          username: username,
          password: password,
        },
      })
      .then((result) => {
        if (result) {
          email
            .create({ userid: result.id, frequency: interval, atTime: time })
            .then(() => res.redirect("/"));
        } else {
          res.redirect("/email", { invalid: true });
        }
      });
  } else {
    res.redirect("/email");
  }
});

emailRouter.get("*", (req, res) => {
  res.render("error");
});

export default emailRouter;
