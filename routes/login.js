import express from "express";
import { connection, sequelize } from "../utils/connection.js";
import user from "../models/user.js";

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  if (req.session.username) {
    req.session.destroy(() => {
      console.log("Session destroyed!");
    });
    res.redirect("/");
  } else {
    res.render("login.ejs", { invalid: false, logged: false });
  }
});

loginRouter.post("/", (req, res) => {
  const { username, password, email } = req.body;
  const flag = connection();
  if (!flag) {
    const result = { message: "error", status: 401, data: undefined };
    res.redirect("/");
  } //
  else {
    const find = user.findAll({
      where: {
        username: username,
      },
    });
    find.then((result) => {
      if (result[0]) {
        req.session.username = result[0].username;
        res.redirect("/");
      } else {
        res.render("login.ejs", { invalid: true, logged: false });
      }
    });
  }
});

loginRouter.get("*", (req, res) => {
  res.render("error");
});

export default loginRouter;
