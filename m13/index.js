// 1. .env - konwencja
// .env environment

// notepad++

// ;
// let b;
// if (true) b = 5;
// if (true) {
//   b = 6;
// }

// const x = {
//   a: 1,
//   b: 1, // trailing commas
//   c: 1,
// };

// const safeDivide = (a, b) => {
//   if (b === 0) {
//     return 0;
//   }
//   return a / b;
// };

// for(let i = 0; i < 10; i++) {
//   console.log(i);
// }

// czy funkcja jest synchroniczna
// fs - syncReadFile readFile
// bcrypt hash

// async function foo() {
//   for (let i = 0; i < 10; i += 1) {
//     console.log(i);
//   }
// }

// export function startSession(options?: mongodb.ClientSessionOptions): Promise<mongodb.ClientSession>;
// function nazwa(argumenty) : Promise<cokolwiek> -> asynchroniczna

// return Promise((resolve) => {})

const express = require("express");
const Boom = require("@hapi/boom");
const app = express();

// app.get("/noReturn", (req, res) => {
//   res.json("noReturn");
//   res.send("noReturn"); // cannot set headers after they are already sent
// });

// app.get("/return", (req, res) => {
//   return res.json("return");
//   res.json("return");
// });

// method 1
// app.get("/resource/:id", (req, res, next) => {
//   const { id } = req.params;
//   if (id === "404") {
//     next();
//   }
//   res.json({ id });
// });

app.get("/test", (req, res) => {
  res.json("test");
});

// method 2
// app.get("/resource/:id", (req, res, next) => {
//   const { id } = req.params;
//   if (id === "404") {
//     return res
//       .status(404)
//       .json({ message: "resource under this id doesnt exist" });
//   }
//   return res.json({ id });
// });

// method 2b
// app.get("/resource/:id", (req, res, next) => {
//   const { id } = req.params;
//   if (id === "404") {
//     res.json(Boom.notFound("missing resource"));
//     // throw Boom.notFound("missing resource");
//   } else {
//     res.json(req.params.id);
//   }
// });

app.get("/error", (req, res) => {
  const n = Math.random(); // 0-1
  if (n > 0.5) {
    // 50% chance of failure
    throw new Error("this went wrong");
  }
  res.json({ message: "success" });
});

app.use((_, res, __) => {
  res.status(404).json({
    message: "error 404 - no such endpoint",
  });
});

app.use((err, _, res, __) => {
  // console.log(err.stack);
  res.status(500).json({
    status: "fail",
    message: err.message,
    data: "Internal Server Error",
  });
});

// try catch // await
// promise().catch

app.listen(3000, () => {
  console.log("listening");
});
