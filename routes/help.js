import express from "express";
const helpRouter = express.Router();

helpRouter.get("/", (req, res) => {
  res.render("help");
});

helpRouter.get("*", (req, res) => {
  res.render("error");
});

export default helpRouter;
