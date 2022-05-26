const usersList = document.getElementById("users");
const board = document.getElementById("board");
const userMessage = document.getElementById("msg_txt");
const userName = document.getElementById("msg_name");
const sendButton = document.getElementById("msg_btn");
const socket = io();

// const socket = io.connect("<path to socket>", {
//   query: `token=${token}`,
// });

userName.value = `user #${Math.floor(Math.random() * 1000)}`;
socket.emit("newUser", userName.value);

const messages = [];
const LIMIT_MESSAGES = 10;

const render = (body, elements) => {
  body.innerHTML = "";
  const fragment = document.createDocumentFragment();

  elements.forEach((element) => {
    fragment.appendChild(element);
  });

  body.appendChild(fragment);
};

const renderListOfMessages = ({ name, message }) => {
  const divName = document.createElement("DIV");
  divName.className = "alert alert-primary col-md-3";
  divName.textContent = name;

  const divMessage = document.createElement("DIV");
  divMessage.className = "alert alert-dark col-md-9";
  divMessage.textContent = message;

  const divWrapper = document.createElement("DIV");
  divWrapper.className = "row";

  divWrapper.appendChild(divName);
  divWrapper.appendChild(divMessage);

  if (messages.unshift(divWrapper) > LIMIT_MESSAGES) {
    messages.pop();
  }

  render(board, messages);
};

const renderListOfUsers = (data) => {
  const userElement = Object.values(data).map((user) => {
    const li = document.createElement("LI");
    li.classList.add("list-group-item");
    li.textContent = user;
    return li;
  });
  render(usersList, userElement);
};

const pressEnterKey = (e) => {
  if (e.keyCode === 13) {
    // keycode dla przycisku enter
    sendUserMessage();
  }
};

const sendUserMessage = () => {
  const name = userName.value;
  const message = userMessage.value;

  if (message === "" || name === "") {
    return;
  }
  // emit eventu do serwera o nazwie message, i body z treścią i nickiem
  socket.emit("message", {
    message,
    name,
  });

  userMessage.value = ""; // czyścimy wartość wysłanej wiadomości
  userMessage.focus(); // wracamy na pole tekstowe wiadomości
};

sendButton.addEventListener("click", sendUserMessage);
userMessage.addEventListener("keyup", pressEnterKey);

socket.on("user", renderListOfUsers);
socket.on("message", renderListOfMessages);
