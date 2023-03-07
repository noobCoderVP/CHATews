import express from "express";
import session from "express-session";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import sequelize from "sequelize";
import axios from "axios";
import * as cron from "node-cron";
import { dirname } from "path";
import { fileURLToPath } from "url";
import schedular from "./schedular.js";

// database connection
import { connection } from "./utils/connection.js";

// Routers
import chatRouter from "./routes/chat.js";
import emailRouter from "./routes/email.js";
import loginRouter from "./routes/login.js";
import headlineRouter from "./routes/headlines.js";
import helpRouter from "./routes/help.js";
import registerRouter from "./routes/register.js";
import {
    intervalRouter,
    countryRouter,
    sourceRouter,
} from "./routes/footer.js";

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

// session
app.use(
    session({
        secret: "iamakey",
        resave: false,
        saveUninitialized: true,
        cookie: { path: "/", maxAge: 1000 * 60 * 60 * 24 * 10 },
    }),
);

// models
import emails from "./models/emails.js";

// socket
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

io.on("connection", socket => {
    console.log("A user is connected!");
    socket.on("chat message", msg => {
        socket.broadcast.emit("chat message", msg);
    });
});

// scheduling emails
cron.schedule("1 * * * * *", () => {
    schedular();
});

// Routes
app.get("/", (req, res) => {
    axios
        .get(
            `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${process.env.API_KEY}`,
        )
        .then(response => {
            const content = response.data.articles.slice(0, 20);
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
app.use("/chat", chatRouter);
app.use("/login", loginRouter);
app.use("/help", helpRouter);
app.use("/email", emailRouter);
app.use("/headline", headlineRouter);
app.use("/register", registerRouter);
app.use("/interval", intervalRouter);
app.use("/countries", countryRouter);
app.use("/sources", sourceRouter);

app.get("/error", (req, res) => {
    if (req.session.username) {
        res.render("error.ejs", { logged: true });
    } else {
        res.render("error.ejs", { logged: false });
    }
});
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
    console.log(err);
    res.render("error", { logged: true });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, "https://chatews-production.up.railway.app/", () => {
    console.log(`Successfully listening on port ${PORT}!`);
});
