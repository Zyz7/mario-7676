import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const mocks = vi.hoisted(() => ({
  findByEmail: vi.fn(),
  create: vi.fn(),
  hashPassword: vi.fn(),
  comparePassword: vi.fn(),
  generateToken: vi.fn(),
  verifyToken: vi.fn(),
}));


vi.mock("../../repositories/user.repository", () => ({
  userRepository: {
    findByEmail: mocks.findByEmail,
    create: mocks.create,
  },
}));

vi.mock("../../utils/password", () => ({
  comparePassword: mocks.comparePassword,
  hashPassword: mocks.hashPassword,
}));

vi.mock("../../utils/jwt", () => ({
  generateToken: mocks.generateToken,
  verifyToken: mocks.verifyToken,
}));


import app from "../../app";

describe("Auth Routes", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("POST /api/v1/auth/register", () => {
    it("debe registrar correctamente un usuario", async () => {
      mocks.findByEmail.mockResolvedValue(undefined);

      mocks.hashPassword.mockResolvedValue("hashed-password");

      mocks.create.mockResolvedValue({
        id: 1,
        name: "Juan Pérez",
        email: "juan@test.com",
      });

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Juan Pérez",
          email: "juan@test.com",
          password: "123456",
          confirm: "123456",
        });

      expect(response.status).toBe(201);

      expect(response.body).toEqual({
        id: 1,
        name: "Juan Pérez",
        email: "juan@test.com",
      });

      expect(mocks.findByEmail).toHaveBeenCalledWith(
        "juan@test.com"
      );

      expect(mocks.hashPassword).toHaveBeenCalledWith(
        "123456"
      );

      expect(mocks.create).toHaveBeenCalledWith({
        name: "Juan Pérez",
        email: "juan@test.com",
        password: "hashed-password",
      });
    });

    it("debe rechazar cuando password y confirm no coinciden", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Juan Pérez",
          email: "juan@test.com",
          password: "123456",
          confirm: "654321",
        });

      expect(response.status).toBe(400);

      expect(response.body).toEqual({
        message: "No coincide la confirmación",
      });

      expect(mocks.findByEmail).not.toHaveBeenCalled();
      expect(mocks.hashPassword).not.toHaveBeenCalled();
      expect(mocks.create).not.toHaveBeenCalled();
    });

    it("debe rechazar datos inválidos", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Juan",
          email: "email-invalido",
          password: "123",
          confirm: "123",
        });

      expect(response.status).toBe(400);

      expect(response.body.message).toBe("Datos inválidos");
      expect(response.body.errors).toBeDefined();

      expect(mocks.findByEmail).not.toHaveBeenCalled();
      expect(mocks.hashPassword).not.toHaveBeenCalled();
      expect(mocks.create).not.toHaveBeenCalled();
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("debe iniciar sesión correctamente", async () => {
      mocks.findByEmail.mockResolvedValue({
        id: 1,
        name: "Juan Pérez",
        email: "juan@test.com",
        password: "hashed-password",
      });

      mocks.comparePassword.mockResolvedValue(true);

      mocks.generateToken.mockReturnValue("fake-token");

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "juan@test.com",
          password: "123456",
        });

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        user: {
          id: 1,
          name: "Juan Pérez",
          email: "juan@test.com",
        },
        token: "fake-token",
      });

      expect(mocks.findByEmail).toHaveBeenCalledWith(
        "juan@test.com"
      );

      expect(mocks.comparePassword).toHaveBeenCalledWith(
        "123456",
        "hashed-password"
      );

      expect(mocks.generateToken).toHaveBeenCalledWith({
        id: 1,
        name: "Juan Pérez",
        email: "juan@test.com",
      });
    });

    it("debe rechazar cuando el usuario no existe", async () => {
      mocks.findByEmail.mockResolvedValue(undefined);

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "noexiste@test.com",
          password: "123456",
        });

      expect(response.status).toBe(500);

      expect(response.body).toEqual({
        message: "Credenciales inválidas",
      });

      expect(mocks.findByEmail).toHaveBeenCalledWith(
        "noexiste@test.com"
      );

      expect(mocks.comparePassword).not.toHaveBeenCalled();
      expect(mocks.generateToken).not.toHaveBeenCalled();
    });

    it("debe rechazar cuando el password es incorrecto", async () => {
      mocks.findByEmail.mockResolvedValue({
        id: 1,
        name: "Juan Pérez",
        email: "juan@test.com",
        password: "hashed-password",
      });

      mocks.comparePassword.mockResolvedValue(false);

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "juan@test.com",
          password: "password-incorrecto",
        });

      expect(response.status).toBe(500);

      expect(response.body).toEqual({
        message: "Email o password inválidos",
      });

      expect(mocks.findByEmail).toHaveBeenCalledWith(
        "juan@test.com"
      );

      expect(mocks.comparePassword).toHaveBeenCalledWith(
        "password-incorrecto",
        "hashed-password"
      );

      expect(mocks.generateToken).not.toHaveBeenCalled();
    });

    it("debe rechazar datos inválidos", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "email-invalido",
          password: "123",
        });

      expect(response.status).toBe(400);

      expect(response.body.message).toBe("Datos inválidos");
      expect(response.body.errors).toBeDefined();

      expect(mocks.findByEmail).not.toHaveBeenCalled();
      expect(mocks.comparePassword).not.toHaveBeenCalled();
      expect(mocks.generateToken).not.toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/auth/me", () => {
  it("debe rechazar cuando no existe token", async () => {
    const response = await request(app)
      .get("/api/v1/auth/me");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: "No autenticado",
    });
  });

  it("debe rechazar cuando el token es inválido", async () => {
    mocks.verifyToken.mockImplementation(() => {
      throw new Error("Token inválido");
    });

    const response = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", "Bearer token-invalido");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: "Token inválido o expirado",
    });

    expect(mocks.verifyToken).toHaveBeenCalledWith(
      "token-invalido"
    );
  });

  it("debe devolver el usuario cuando el token es válido", async () => {
    const user = {
      id: 1,
      name: "Juan Pérez",
      email: "juan@test.com",
    };

    mocks.verifyToken.mockReturnValue(user);

    const response = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", "Bearer token-valido");

    expect(response.status).toBe(200);

    expect(response.body).toEqual(user);

    expect(mocks.verifyToken).toHaveBeenCalledWith(
      "token-valido"
    );
  });
});

});
