const { helloWorld, hello } = require("../routes/");

describe("test controllers", () => {
  test("does helloWorld work", () => {
    const req = {};
    const res = {
      send: function (string) {
        this.text = string;
      },
    };

    helloWorld(req, res);
    expect(res.text).toEqual("hello world");
  });

  test("does /hello/:name respond", () => {
    const req = { params: { name: "Bob" } };
    const res = {
      send: function (string) {
        this.text = string;
      },
    };
    hello(req, res);
    expect(res.text).toEqual("hello Bob!");
  });

  test("does /hello/:name respond to undefined name", () => {
    const req = { params: { name: undefined } };
    const res = {
      send: function (string) {
        this.text = string;
      },
    };
    hello(req, res);
    expect(res.text).toEqual("hello world!");
  });
});
