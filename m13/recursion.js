// fibbonaci
// 1,1,2,3,5,8,13,21,34

// iteracyjne (for loop)

// rekursywnie
function fibbonaci(num) {
  console.log("wywolanie fibb", num);
  // exit condition
  if (num < 2) {
    return num;
  } else {
    return fibbonaci(num - 1) + fibbonaci(num - 2);
  }
}

const n = 10;

// for (let i = 1; i < n; i++) {
//   console.log(fibbonaci(i));
// }

console.log(fibbonaci(4));
