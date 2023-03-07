import express from "express";
import user from "../models/user.js";
import { Op } from "sequelize";
import friends from "../models/friends.js";
const chatRouter = express.Router();

chatRouter.get("/", (req, res) => {
  if (req.session.username) {
    user.findAll().then((result) => {
      // console.log(result);
      let users = [];
      for (let i of result) {
        users.push(i.username);
      }

      res.render("chat.ejs", {
        logged: true,
        username: req.session.username,
        users: users,
      });
    });
  } else {
    user.findAll().then((result) => {
      // console.log(result);
      let users = [];

      res.render("chat.ejs", {
        logged: false,
        username: req.session.username,
        users: users,
      });
    });
  }
});

chatRouter.get("*", (req, res) => {
  res.render("error");
});

export default chatRouter;
