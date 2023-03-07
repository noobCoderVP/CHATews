import user from "./models/user.js";
import email from "./models/emails.js";
import { sequelize, connection } from "./utils/connection.js";

// const find = user.findAll({
//   where: {
//     username: "jack",
//   },
// });

// find.then((res) => {
//   console.log(res[0].name);
// });

// user.findOne({ where: { username: "vavipa" } }).then((res) => console.log(res));

// import mailer from "nodemailer";

// const transport = mailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "minewsorganization@gmail.com",
//     pass: process.env.MAIL_PASSWORD,
//   },
// });

// const mailoptions = {
//   from: "minewsorganization@gmail.com",
//   to: "miteshsurti93@gmail.com",
//   subject: "checking nodemailer",
//   html: "<h1>Hello Mitesh, I am vaibhav</h1>",
// };

// transport.sendMail(mailoptions, (err, info) => {
//   if (err) throw err;
//   console.log("Email sent: ", info.response);
// });
email.findAll().then((res) => {
  // console.log(res);
  console.log(res[0]);
});

// const date = new Date();
// date.setSeconds(0);
// // var str = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
// var str2 = "12:12:00";
// var arr = str2.split(":");
// if (arr[0] == date.getHours() && arr[1] == date.getMinutes()) {
//   console.log("It is true");
// }
// const newdate = new Date();
// console.log(newdate.getHours());
