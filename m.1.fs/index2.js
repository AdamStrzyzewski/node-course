const fs = require("fs").promises;

fs.readFile("data.json")
  .then((data) => {
    // Buffer
    const string = data.toString();
    const object = JSON.parse(string);
    console.log(object["test-key"]);
  })
  .catch((err) => {
    console.log(err.message);
  });

// przykłady operacji fs
// fs.writeFile()
// JSON.stringify(data)
// fs.appendFile()
// fs.rename()
// fs.unlink() // delete

// zmienna process
// process.exit(0);
// console.log(process.argv);

// event loop
// process.nextTick(function () {
//   console.log("next Tick");
// });
// setImmediate(function () {
//   console.log("setImmediate complete");
// });
// setTimeout(function () {
//   console.log("setTimeout");
// }, 0);
// setInterval(function () {}, 2000);
