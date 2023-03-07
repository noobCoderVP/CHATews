import { Router } from "express";
import axios from "axios";

const countryRouter = Router();
const sourceRouter = Router();
const intervalRouter = Router();

countryRouter.get("/:country", (req, res) => {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=${req.params.country}&pageSize=10&sortBy=popularity&apiKey=${process.env.API_KEY}`
    )
    .then((response) => {
      const content = response.data.articles;
      if (content.length > 20) {
        content = content.slice(0, 20);
      }
      if (req.session.username) {
        res.render("index.ejs", {
          logged: true,
          username: req.session.username,
          content: content,
        });
      } //
      else {
        const result = {
          message: "failure",
          logged: false,
          username: req.session.username,
          content: content,
        };
        res.render("index.ejs", result);
      }
    });
});

sourceRouter.get("/:source", (req, res) => {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?sources=${req.params.source}&pageSize=10&sortBy=popularity&apiKey=${process.env.API_KEY}`
    )
    .then((response) => {
      const content = response.data.articles;
      if (content.length > 20) {
        content = content.slice(0, 20);
      }
      if (req.session.username) {
        res.render("index.ejs", {
          logged: true,
          username: req.session.username,
          content: content,
        });
      } //
      else {
        const result = {
          message: "failure",
          logged: false,
          username: req.session.username,
          content: content,
        };
        res.render("index.ejs", result);
      }
    });
});

intervalRouter.get("/:inter", (req, res) => {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=${req.params.inter}&pageSize=10&sortBy=popularity&apiKey=${process.env.API_KEY}`
    )
    .then((response) => {
      const content = response.data.articles;
      if (content.length > 20) {
        content = content.slice(0, 20);
      }
      if (req.session.username) {
        res.render("index.ejs", {
          logged: true,
          username: req.session.username,
          content: content,
        });
      } //
      else {
        const result = {
          message: "failure",
          logged: false,
          username: req.session.username,
          content: content,
        };
        res.render("index.ejs", result);
      }
    });
});

export { countryRouter, sourceRouter, intervalRouter };
