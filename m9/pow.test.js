const pow = require("./pow");

describe("hooks", function () {
  beforeAll(() => {
    console.log("Before all tests");
  });

  beforeEach(() => {
    console.log("before each single test");
  });

  afterEach(() => {
    console.log("after each single test");
  });

  test("1 to the power of 2 is equal 1", () => {
    expect(pow(1, 2)).toBe(1); // expect the results of a call of pow(1,2) to be equal 1
  });

  // test("1 to the power of 2 is equal 1", () => {
  //  expect(pow(1, 2)).toBe(2); // expect the results of a call of pow(1,2) to be equal 1
  // });
  test("3 to power 2 to equal", () => {
    expect(pow(3, 2)).toBe(9);
  });

  afterAll(() => {
    console.log("After all tests");
  });
});
