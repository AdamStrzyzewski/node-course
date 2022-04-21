const fs = require("fs").promises;

const DECIMAL_SYSTEM = 10;

const getNumberOrDefault = (s, def) => {
  const parsedS = parseInt(s, DECIMAL_SYSTEM);
  if (isNaN(parsedS)) {
    return def;
  }
  return parsedS;
};

const isValid = ({ n, start, end }) => {
  if (isNaN(n)) {
    console.log("Wprowadź liczbę!".red);
    return false;
  } // Not a Number

  if (n < start || n > end) {
    console.log(
      `Liczba powinna znajdować się w przedziale od ${start} do ${end}`.red
    );
    return false;
  }

  return true;
};

const log = async (data, logFile) => {
  console.log(logFile);
  try {
    await fs.appendFile(logFile, `${data}\n`);
    console.log(`Udało się zapisać rezultat w pliku ${logFile}`.green);
  } catch (err) {
    console.log(err);
    console.log(`Nie udało się zapisać pliku ${logFile}`.red);
  }
};

const question = (rl, q) => {
  return new Promise((resolve) => {
    rl.question(q, (value) => {
      resolve(value);
    });
  });
};

module.exports = {
  getNumberOrDefault,
  isValid,
  log,
  question,
};
