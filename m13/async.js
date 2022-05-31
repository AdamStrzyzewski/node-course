const create = (str) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(str);
      resolve("hej");
    }, 1000);
  });
};

const foo = (str) => create(str);
const bar = async (str) => {
  create(str);
}; // await ma wpływ na kolejność
const awaitBar = async (str) => {
  await create(str);
}; // await nie ma wpływu

// const n = () => 5;
// const m = () => {
//   return 5;
// };

// console.log("n", n());
// console.log("m", m());

const server = async () => {
  const fooResult = await foo("foo");
  const awaitBarResult = await awaitBar("awaitBar");
  const barResult = await bar("bar");
  console.log({ fooResult, barResult, awaitBarResult });
};

server();
