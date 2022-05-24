const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("running on a port");
});

// docker build . -t course/docker-test -> zbudowanie obrazu
// docker run -P -d course/docker-test -> uruchomienie obrazu z `P` - losowy zewnętrzny port
// docker run -p 42234:3000 -d course/docker-test -> uruchomienie obrazu z `p` - zdefiniowany port
// flaga -d, daemon obraz zostaje uruchomiony w tle
// bez tej flagi command+d
// docker ps (uruchomione kontenery)
// docker ps -a (wszystkie kontenery)
// docker logs <CONTENER Id>
// docker stop 9848d9b9f8bb -t 1 // zatrzymanie kontenera

// https://docs.docker.com/engine/reference/commandline/save/ -> to save a .tar, .gzip // spakowane archiwum
