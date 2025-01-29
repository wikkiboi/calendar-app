import { describe, it, expect } from "vitest";
import request from "supertest";
import { createTestServer } from "./testServer";
import { generateToken } from "../helper/auth/generateToken";

const app = createTestServer();

describe("User Router", () => {
  it("should register a new user successfully", async () => {
    const res = await request(app).post("/trpc/user.register").send({
      email: "test@example.com",
      name: "Test user",
      password: "securepassword",
    });

    expect(res.status).toBe(200);
    expect(res.body.result.data.message).toBe("User registered successfully!");
    expect(res.body.result.data.token).toBeDefined();
  });
  it("should fail to register with existing email", async () => {
    const res = await request(app).post("/trpc/user.register").send({
      email: "test@example.com",
      name: "Test User 2",
      password: "securepassword",
    });

    expect(res.status).toBe(500);
    expect(res.body.error.message).toBe("Email already registered.");
  });

  it("should login in an existing user successfully", async () => {
    const res = await request(app).post("/trpc/user.login").send({
      email: "test@example.com",
      password: "securepassword",
    });

    expect(res.status).toBe(200);
    expect(res.body.result.data.message).toBe("Login successful!");
    expect(res.body.result.data.token).toBeDefined();
  });

  it("should fail to login with wrong password", async () => {
    const res = await request(app).post("/trpc/user.login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(500);
    expect(res.body.error.message).toBe("Invalid email or password.");
  });

  it("should logout successfully and blacklist token", async () => {
    const token = generateToken("test-user-id");

    const res = await request(app)
      .post("/trpc/user.logout")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.result.data.message).toBe("Logout successful!");
  });
});
