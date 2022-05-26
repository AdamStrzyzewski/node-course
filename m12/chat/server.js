const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));

server.listen(process.env.PORT || 3000, function () {
  console.log("Server running in port 3000");
});

const users = {};

io.sockets.on("connection", (client) => {
  const broadcast = (event, data) => {
    client.emit(event, data); // emit event do konkretnego clienta/połączenia
    client.broadcast.emit(event, data); // to jest do wszystkich połączeń
  };

  client.on("newUser", (message) => {
    users[client.id] = message;
    broadcast("user", users);
  });

  // event - otrzymujemy wiadomość z przeglądarki
  client.on("message", (message) => {
    if (users[client.id] !== message.name) {
      // client.id to unikatowy identyfikator połączenia socketowego
      users[client.id] = message.name;
      broadcast("user", users);
    }
    broadcast("message", message);
  });

  client.on("disconnect", () => {
    delete users[client.id];
    client.broadcast.emit("user", users);
  });
});

// socket rooms dla ciekawych
