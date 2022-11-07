jest.mock("../src/emails/accounts.js");
const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { testUserId, testUser, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("New User", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Ali",
      email: "ali1@gmail.com",
      password: "12345678",
    })
    .expect(201);
});

test("Login", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "zain@gmail.com",
      password: "12345678",
    })
    .expect(200);
});

test("Fail Login", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "zain@gmail.com",
      password: "123456789",
    })
    .expect(400);
});

test("User Profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Delete Profile", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Delete Profile", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200);
});

test("upload avatar", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/pos.jpg")
    .expect(200);
  const user = await User.findById(testUserId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Update Profile", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send({
      name: "Hi",
    })
    .expect(200);
});
