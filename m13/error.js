const getResult = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const x = Math.random();
      if (x > 0.5) {
        resolve(x);
      }
      reject("Error in Promise");
    }, 1000);
  });
};

const server = async () => {
  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(getResult());
  }

  try {
    const a = await Promise.all(promises);
    console.log("a", a);
  } catch (e) {
    console.log("error a", e);
  }

  const b = await Promise.allSettled(promises);
  console.log(b);
};

server();
