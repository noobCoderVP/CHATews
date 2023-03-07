import admin from "./admin.js";
import bookmark from "./bookmarks.js";
import chat from "./chats.js";
import email from "./emails.js";
import filter from "./filters.js";
import friend from "./friends.js";
import query from "./queries.js";
import user from "./user.js";

admin.sync().then((res) => console.log(res));
bookmark.sync().then((res) => console.log(res));
chat.sync().then((res) => console.log(res));
email.sync().then((res) => console.log(res));
filter.sync().then((res) => console.log(res));
friend.sync().then((res) => console.log(res));
query.sync().then((res) => console.log(res));
user.sync().then((res) => console.log(res));
