import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import sequelize from "sequelize";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

// database connection
import connection from "./utils/connection.js";

// Routers
import chatRouter from "./routes/chat.js";
import emailRouter from "./routes/email.js";
import loginRouter from "./routes/login.js";
import headlineRouter from "./routes/headlines.js";
import helpRouter from "./routes/help.js";
import registerRouter from "./routes/register.js";

// dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// dotenv
dotenv.config();

// express
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${process.env.API_KEY}`
    )
    .then((response) => {
      const content = response.data.articles.slice(0, 20);
      res.render("index", { content });
    });
});
app.use("/chat", chatRouter);
app.use("/login", loginRouter);
app.use("/help", helpRouter);
app.use("/email", emailRouter);
app.use("/headline", headlineRouter);
app.use("/register", registerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Successfully listening on port ${PORT}!`);
});
