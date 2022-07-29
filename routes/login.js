import express from "express";
const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.render("login");
});

loginRouter.get("*", (req, res) => {
  res.render("error");
});

export default loginRouter;
