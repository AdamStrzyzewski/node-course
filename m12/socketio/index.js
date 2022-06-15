const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  // socket === ws z poprzedniego przykładu
  console.log("User connected");
  socket.emit("message", "You got connected");
  // message => nazwa eventu
  // you got connected => payload,body eventu (to może być obiekt, tablica etc.)
});

// io.on("message", () => {}); // otrzymuje wiadomość od klienta
// io.on('disconnect', () => {})

http.listen(3000, () => {
  console.log("listening on port 3000");
});
