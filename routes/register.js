import express from "express";
import { connection, sequelize } from "../utils/connection.js";
import user from "../models/user.js";

const registerRouter = express.Router();

registerRouter.get("/", (req, res) => {
  res.render("register.ejs", { logged: false, exist: false });
});

registerRouter.post("/", (req, res) => {
  const { name, profession, email, age, username, password } = req.body;
  const flag = connection();
  if (!flag) {
    res.redirect("/error");
  } //
  else {
    // const find = user.findAll({ where: { username: username } });
    const find = user.findAll({ where: { username: username } });
    find.then((result) => {
      if (result[0]) {
        res.render("register.ejs", { exist: true });
      } else {
        const newuser = user.create({
          name: name,
          username: username,
          email: email,
          age: age,
          password: password,
          profession: profession,
        });
        req.session.username = username;
        res.redirect("/");
      }
    });
    // console.log(find);
    // const newuser = user.create({
    //   name: name,
    //   username: username,
    //   email: email,
    //   age: age,
    //   password: password,
    //   profession: profession,
    // });
  }
});

registerRouter.get("*", (req, res) => {
  res.render("error");
});

export default registerRouter;
