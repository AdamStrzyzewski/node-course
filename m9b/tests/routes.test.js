const mongoose = require("mongoose");
const request = require("supertest"); // superagent
const express = require("express");
const { router } = require("../routes");

const app = new express();
app.use(express.json());
app.use("/", router);
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.DB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe("test routes", () => {
  test("does /hello GET works", async () => {
    const res = await request(app).get("/hello");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("hello world");
  });

  test("does /hello/Adam GET works", async () => {
    const res = await request(app).get("/hello/Adam");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual("hello Adam!");
  });

  test("responds to /hello/Johnny", async () => {
    const res = await request(app).get("/hello/Johnny");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual("hello Johnny!");
  });

  // integration test of create/get/delete user flow
  test("check to create a user", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: "test@test.pl",
        username: "AdamS",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ message: "created" });
  });

  test("get a list of users with one user", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1); // we have retrieved user
  });

  test("delete users", async () => {
    const res = await request(app).delete("/users");
    expect(res.statusCode).toBe(204);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
