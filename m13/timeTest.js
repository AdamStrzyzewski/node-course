// scalić stringa
function randomLetter() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return characters.charAt(Math.floor(Math.random() * characters.length));
}
const stringLength = 2;

console.time("concatenation"); // start stopera
let s = "";
for (let i = 0; i < stringLength; i++) {
  s += randomLetter();
}
// console.timeLog("concatenation"); // czas w środku
console.timeEnd("concatenation"); // czas na koniec

console.time("array"); // start stopera
s = [];
for (let i = 0; i < stringLength; i++) {
  s.push(randomLetter());
}
s = s.join("");
// console.timeLog("array"); // czas w środku
console.timeEnd("array"); // czas na koniec

console.time("literal"); // start stopera
s = "";
for (let i = 0; i < stringLength; i++) {
  s = `${s}${randomLetter()}`;
}
// console.timeLog("literal"); // czas w środku
console.timeEnd("literal"); // czas na koniec
