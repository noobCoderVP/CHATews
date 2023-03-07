import express from "express";
import axios from "axios";
const headlineRouter = express.Router();

headlineRouter.get("/", (req, res) => {
  axios
    .get(
      `https://newsapi.org/v2/everything?pageSize=20&language=en&sortBy=popularity&q=india&page=1&apiKey=${process.env.API_KEY}`
    )
    .then((response) => {
      const content = response.data.articles.slice(0, 20);
      if (req.session.username) {
        res.render("headline", { logged: true, content: content });
      } else {
        res.render("headline", { logged: false, content: content });
      }
    })
    .catch((error) => console.log(error));
});

headlineRouter.get("*", (req, res) => {
  res.render("error");
});

export default headlineRouter;
