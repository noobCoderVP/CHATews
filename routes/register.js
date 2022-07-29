import express from "express";
const registerRouter = express.Router();

registerRouter.get("/", (req, res) => {
  res.render("register");
});

registerRouter.get("*", (req, res) => {
  res.render("error");
});

export default registerRouter;
