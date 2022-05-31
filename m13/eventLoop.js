const baz = () => console.log("baz");
const foo = () => console.log("foo");
const zoo = () => console.log("zoo");

const start = () => {
  console.log("start"); // 0
  setImmediate(baz); // setTimeout i setInterval // 4

  new Promise((resolve) => {
    resolve("bar");
  }).then((data) => {
    console.log(data); // to rozpatrywane jest przed setImmediate // 2
    process.nextTick(zoo); // wykona się przed kolejnym obrotem loopa // 3
  });

  process.nextTick(foo); // 1 // wykona przed kolejnym obrotem
};

start();

// start baz bar

// rekursja
// recursion
