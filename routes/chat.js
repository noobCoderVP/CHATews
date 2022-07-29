import express from "express";
const chatRouter = express.Router();

chatRouter.get("/", (req, res) => {
  res.render("chat");
});

chatRouter.get("*", (req, res) => {
  res.render("error");
});

export default chatRouter;
