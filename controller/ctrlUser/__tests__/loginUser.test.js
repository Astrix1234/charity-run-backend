import supertest from "supertest";
import app from "../../../app.js";
import userService from "#service/userService.js";
import { jest } from "@jest/globals";
import bcrypt from "bcryptjs";

jest.spyOn(userService, "validateUser").mockResolvedValue({
  email: "test@example.com",
  password: bcrypt.hashSync("password123", 10),
  subscription: "starter",
});
jest.spyOn(userService, "updateToken").mockResolvedValue(true);

describe("Login Controller", () => {
  it("should return 200 and token for valid credentials", async () => {
    const response = await supertest(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toEqual({
      email: "test@example.com",
      subscription: "starter",
    });
  });
});
