/*
  "start": "node index.js",
  "start:dev": "nodemon index.js",
*/

// npm init
const readline = require("readline");
// process.argv
const { program } = require("commander");
const path = require("path");
const fs = require("fs").promises;
require("colors");

const { getNumberOrDefault, isValid, log, question } = require("./helpers");

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 10;

program
  .option("-f, --file [String]", "file for saving game result", "results.txt")
  .option("-s, --start [Number]", "minimum value for guessing", DEFAULT_MIN)
  .option("-e, --end [Number]", "maximum value for guessing", DEFAULT_MAX);

// podajemy nasze argumenty z wiersza poleceń
program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin, // readable stream
  output: process.stdout, // writeable stream
});
// zadeklarowanie ścieżke do pliku z wynikami
const logFile = path.join(__dirname, program.opts().file);
const logFileDirectory = path.dirname(logFile); // "obcina" nazwę pliku ze ścieżki

let { start, end } = program.opts();
start = getNumberOrDefault(start, DEFAULT_MIN);
end = getNumberOrDefault(end, DEFAULT_MAX);

const startGame = () => {
  // ile razy ktoś już zgadywał
  let count = 0;
  // <start, end>
  const randomInteger = Math.floor(Math.random() * end) + start;
  console.log("random number is", randomInteger);
  const gameLoop = async () => {
    const value = await question(
      rl,
      `Wprowadź liczbę od ${start} do ${end}: `.yellow
    );
    let n = +value; // String => Number
    if (!isValid({ n, start, end })) {
      gameLoop();
      return;
    }

    count += 1;

    if (n === randomInteger) {
      console.log("Gratulacje. Odgadłeś liczbę w %d razów".green, count);
      // console.log(`Gratulacje. Odgadłeś liczbę w ${count} razów`.green); // to jest alternatywny zapis
      // zapis do pliku
      await log(
        `${new Date().toLocaleDateString()}: Gratulacje, udało się odgadnąć liczbę za ${count} razem`,
        logFile
      );
      rl.close();
      // .then(() => {}) // resolve
      // .catch(() => {}) // reject
      return;
    }

    // for Monika
    if (count === 3) {
      // 3,6,9
      console.clear();
      console.log("Nie odgadłeś za 3 razem, resetujemy grę".blue);
      startGame();
      return;
    }

    console.log("Nie zgadłeś. Kolejna próba".red);
    gameLoop();
  };
  gameLoop();
};

// sprawdzenie i ewentualne utworzenie nowego katalogu
fs.access(logFile)
  .then(() => {
    // jeżeli katalog istnieje
    startGame();
  })
  .catch(() => {
    fs.mkdir(logFileDirectory, { recursive: true })
      .then(() => {
        // po utworzeniu nowej struktury katalogów
        startGame();
      })
      .catch(() => {
        console.log("Nie udało się utworzyć katalogów".red);
        process.exit(1);
      });
  });
