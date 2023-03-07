const searchButton = document.getElementById("send");
const messages = document.getElementById("messages");
const username = document.getElementById("hid");
let value = document.getElementById("msg");
var socket = io();

searchButton.addEventListener("click", (element) => {
  const newElem = document.createElement("p");
  newElem.classList.add("schat");
  newElem.innerHTML = `${username.innerHTML}: ${value.value}`;
  messages.appendChild(newElem);
  socket.emit("chat message", {
    message: value.value,
    user: username.innerHTML,
  });
  value.value = "";
  messages.scrollBy(0, 80);
});

socket.on("chat message", (msg) => {
  const newElem = document.createElement("p");
  newElem.classList.add("rchat");
  newElem.innerHTML = `${msg.user}: ${msg.message}`;
  messages.appendChild(newElem);
  value.value = "";
  messages.scrollBy(0, 80);
});
