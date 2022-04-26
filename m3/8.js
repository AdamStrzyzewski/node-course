const express = require("express");
const app = express();

app.all("/", (req, res) => {
  res.send(req.method);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

// app.use(); // tools, router middlewares
// app.all();
// app.get();
// app.post();
// app.delete(); // itp
// app.listen();

// req.params
// req.query
// req.body

// res.locals
// res.send() // buffer, string, object, boolean, array
// res.json()
// res.render() // html - SSR server side rendering
// res.sendFile() // stream
// res.redirect(url) -> przekierowanie

// res.download() // zaproszenie do ładowania
// res.end() // 204

// res.jsonp() // historical

// express
// fastify
// Nest.js - nakładką na express/fastify
