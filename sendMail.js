import mailer from "nodemailer";
import axios from "axios";

function sendMail(receiverMail) {
  const transport = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "minewsorganization@gmail.com",
      pass: "xfoywfxbedqzwjcl",
    },
  });
  let start = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>News Email</title>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
        *,
        ::before,
        ::after {
          box-sizing: border-box;
        }
        body {
          margin: 0px;
          background-color: whitesmoke;
        }
        .head h1 {
          color: aqua;
          background-color: black;
          font-size: 50px;
          padding: 20px 0px;
          margin: 0px;
          margin-left: 20px;
          text-align: center;
        }
        .head {
          padding-left: 15px;
          background-color: black;
          display: flex;
          align-content: center;
          align-items: center;
          justify-content: space-around;
        }
        #login {
          margin-left: auto;
          margin-right: 20px;
          background-color: crimson;
          color: white;
        }
        #register {
          margin-right: 40px;
          background-color: rgb(194, 194, 194);
        }
        .head button {
          font-size: 30px;
          border-radius: 10px;
          padding: 10px;
          transition: all 0.3s;
        }
        #login:hover {
          transform: scale(1.1);
          background-color: red;
        }
        #register:hover {
          transform: scale(1.1);
          background-color: whitesmoke;
        }
        .navbar {
          list-style-type: none;
          display: flex;
          justify-content: space-evenly;
          padding: 20px 0px;
          margin: 0px;
          background-color: rgb(56, 56, 56);
        }
        nav {
          position: sticky;
          z-index: 1;
          border-bottom: 1px solid white;
          box-shadow: 2px 0px 10px 0px orange;
          top: 0px;
        }
        .navbar a {
          text-decoration: none;
          font-size: larger;
          color: white;
          font-size: 25px;
        }
        .navbar a:hover {
          color: gold;
        }
        .menu {
          display: grid;
          background-color: rgb(56, 56, 56);
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          justify-content: space-evenly;
          color: white;
        }
        h2 {
          text-align: center;
          margin: 3px;
          padding-top: 10px;
        }
        .menu div {
          display: flex;
          flex-direction: column;
          border-right: 3px solid white;
          padding-bottom: 20px;
        }
        .menu ul {
          margin: auto auto;
          font-size: 18px;
          padding-left: 10px;
        }
        footer p {
          background-color: black;
          color: white;
          text-align: center;
          font-size: large;
          margin: 0px;
          padding: 15px;
        }
        hr {
          width: 80%;
          margin-bottom: 15px;
        }
        main {
          min-height: 200px;
        }
        button a {
          text-decoration: none;
          color: white;
        }
        .article {
          display: grid;
          grid-template-columns: 50% 50%;
          background-color: aquamarine;
          align-items: center;
          justify-content: space-around;
          align-content: center;
          min-height: 300px;
          border: 2px solid purple;
          padding: 40px;
          margin: 20px;
          transition: all 0.3s;
        }
        .article:nth-of-type(2n) {
          background-color: beige;
        }
        .article img {
          box-shadow: 3px 3px 10px 1px rgb(163, 163, 163);
        }
        .desc > a {
          background-color: black;
          display: inline-block;
          color: white;
          font-size: 18px;
          padding: 10px;
        }
        .date {
          font-size: 20px;
          background-color: blue;
          padding: 10px;
          display: inline-block;
          color: white;
        }
        .source {
          background-color: red;
          color: white;
          padding: 10px;
          font-size: 18px;
          margin-top: 10px;
          display: inline-block;
        }
        .article h2 {
          font-family: "lobster two";
          background-color: white;
          padding: 10px;
          border: 2px solid black;
        }
        .article p {
          font-size: 18px;
          font-weight: 500;
        }
        .search {
          margin-left: 100px;
          font-size: 22px;
          padding: 5px;
          padding-left: 20px;
        }
        #search {
          font-size: 22px;
          padding: 7px;
          background-color: gold;
          color: black;
          border-radius: 3px;
          transition: all 0.3s;
        }
        #search:hover {
          background-color: rgba(255, 217, 0, 0.8);
        }
        .greet {
          background-color: blue;
          color: white;
          font-size: 1.5rem;
          padding: 0.4em;
          margin: 0.4em;
          border: none;
          margin-bottom: -1em;
        }
      </style>
    </head>
    <body>
      <header>
        <div class="head">
          <h1>MInews</h1>
        </div>
      </header>
      <main>`;

  const end = `</main>
  <footer>
    <p>&copy;copyright 2022, CHATews PVT LTD.</p>
  </footer>
</body>
</html>`;

  axios
    .get(
      `https://newsapi.org/v2/everything?pageSize=20&language=en&sortBy=popularity&q=india&page=1&apiKey=b25c0b420d6146eab7d9940c8f9f7456`
    )
    .then((response) => {
      const content = response.data.articles.slice(0, 20);
      var i;
      for (i of content) {
        if (!i.urlToImage) continue;
        const date = new Date(i.publishedAt);
        start += `<div class="article">
        <div class="image">
          <img src="${i.urlToImage}" alt="" width="80%" height="80%" />
        </div>
        <div class="desc">
          <div class="date">
            ${date.getDate()}/${date.getMonth() + 1}/
            ${date.getFullYear()}
          </div>
          <h2>${i.title}</h2>
          <p>${i.description}</p>
          <a href="${i.url}">Read more...</a>
        </div>
      </div>`;
      }
      start += end;
      const mailoptions = {
        from: "minewsorganization@gmail.com",
        to: receiverMail,
        subject: "news from nodemailer",
        html: start,
      };

      transport.sendMail(mailoptions, (err, info) => {
        if (err) throw err;
        console.log("Email sent: ", info.response);
      });
    })
    .catch((error) => console.log(error));
}

// sendMail("miteshsurti93@gmail.com");

export default sendMail;
