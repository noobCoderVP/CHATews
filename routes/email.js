import express from "express";
const emailRouter = express.Router();

emailRouter.get("/", (req, res) => {
  res.render("email");
});

emailRouter.get("*", (req, res) => {
  res.render("error");
});

export default emailRouter;
