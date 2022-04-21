// npm init
const readline = require("readline");
// process.argv
const { program } = require("commander");
const fs = require("fs").promises;
require("colors");

program.option(
  "-f, --file [String]",
  "file for saving game result",
  "results.txt"
);

// podajemy nasze argumenty z wiersza poleceń
program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin, // readable stream
  output: process.stdout, // writeable stream
});

// <1,10>
const randomInteger = Math.floor(Math.random() * 10) + 1;
// ile razy ktoś już zgadywał
let count = 0;
// zadeklarowanie ścieżke do pliku z wynikami
const logFile = program.opts().file;
// const { file: logFile } = program.opts(); -> alternatywna deklaracja

const isValid = (n) => {
  if (isNaN(n)) {
    console.log("Wprowadź liczbę!".red);
    return false;
  } // Not a Number

  if (n < 1 || n > 10) {
    console.log("Liczba powinna znajdować się w przedziale od 1 do 10".red);
    return false;
  }

  return true;
};

const log = async (data) => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
    console.log(`Udało się zapisać rezultat w pliku ${logFile}`.green);
  } catch (err) {
    console.log(`Nie udało się zapisać pliku ${logFile}`.red);
  }
};

const gameLoop = () => {
  rl.question("Wprowadź liczbę od 1 do 10: ".yellow, (value) => {
    // -> value <String>
    let n = +value; // String => Number
    if (!isValid(n)) {
      gameLoop();
      return;
    }
    count += 1;
    if (n === randomInteger) {
      console.log("Gratulacje. Odgadłes liczbę w %d razów".green, count);
      // console.log(`Gratulacje. Odgadłeś liczbę w ${count} razów`.green); // to jest alternatywny zapis
      // zapis do pliku
      log(
        `${new Date().toLocaleDateString()}: Gratulacje, udało się odgadnąć liczbę za ${count} razem`
      ).finally(() => {
        rl.close();
      }); // always
      // .then(() => {}) // resolve
      // .catch(() => {}) // reject
      return;
    }
    console.log("Nie zgadłeś. Kolejna próba".red);
    gameLoop();
  });
};

gameLoop();

/**
 * uruchomić i przyjąć pewną flagę która przekaże do jakiego pliku chcemy zapisać wyniki
 * wylosować liczbę pomiędzy 1 a 10
 * pozwolić użytkownikowi zgadywać tę liczbę
 * kiedy zgadnie, powinniśmy zapisać ile prób zajęło mu odganięcie liczby
 * zapisuje ten wynik do pliku
 */
