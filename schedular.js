import email from "./models/emails.js";
import user from "./models/user.js";
import sendMail from "./sendMail.js";

function schedular() {
  email.findAll().then((result) => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let str;
    result.forEach((element) => {
      str = element.atTime;
      var arr = str.split(":");
      if (arr[0] == hours && arr[1] == minutes) {
        user.findOne({ where: { id: element.userid } }).then((response) => {
          sendMail(response.email);
        });
      }
    });
  });
}

export default schedular;
