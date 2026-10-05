import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  findByEmail: vi.fn(),
  create: vi.fn(),
  comparePassword: vi.fn(),
  hashPassword: vi.fn(),
  generateToken: vi.fn(),
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
}));

import { authService } from "../../services/auth.service";

describe("authService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("login", () => {
    it("debe rechazar cuando el usuario no existe", async () => {
      mocks.findByEmail.mockResolvedValue(undefined);

      await expect(
        authService.login("test@test.com", "123456")
      ).rejects.toThrow("Credenciales inválidas");

      expect(mocks.findByEmail).toHaveBeenCalledWith(
        "test@test.com"
      );
    });

    it("debe rechazar cuando el password es incorrecto", async () => {
      mocks.findByEmail.mockResolvedValue({
        id: 1,
        name: "Juan",
        email: "test@test.com",
        password: "hashed-password",
      });

      mocks.comparePassword.mockResolvedValue(false);

      await expect(
        authService.login("test@test.com", "wrong-password")
      ).rejects.toThrow("Email o password inválidos");

      expect(mocks.comparePassword).toHaveBeenCalledWith(
        "wrong-password",
        "hashed-password"
      );
    });

    it("debe iniciar sesión correctamente", async () => {
      mocks.findByEmail.mockResolvedValue({
        id: 1,
        name: "Juan",
        email: "test@test.com",
        password: "hashed-password",
      });

      mocks.comparePassword.mockResolvedValue(true);
      mocks.generateToken.mockReturnValue("fake-jwt-token");

      const result = await authService.login(
        "test@test.com",
        "correct-password"
      );

      expect(result).toEqual({
        user: {
          id: 1,
          name: "Juan",
          email: "test@test.com",
        },
        token: "fake-jwt-token",
      });

      expect(mocks.generateToken).toHaveBeenCalledWith({
        id: 1,
        name: "Juan",
        email: "test@test.com",
      });
    });
  });

  describe("register", () => {
    it("debe rechazar cuando el usuario ya existe", async () => {
      mocks.findByEmail.mockResolvedValue({
        id: 1,
        name: "Juan",
        email: "test@test.com",
        password: "hashed-password",
      });

      await expect(
        authService.register(
          "Juan",
          "test@test.com",
          "123456"
        )
      ).rejects.toThrow("El usuario ya existe");

      expect(mocks.hashPassword).not.toHaveBeenCalled();
      expect(mocks.create).not.toHaveBeenCalled();
    });

    it("debe registrar correctamente un usuario", async () => {
      mocks.findByEmail.mockResolvedValue(undefined);

      mocks.hashPassword.mockResolvedValue("hashed-password");

      mocks.create.mockResolvedValue({
        id: 1,
        name: "Juan",
        email: "test@test.com",
      });

      const result = await authService.register(
        "Juan",
        "test@test.com",
        "123456"
      );

      expect(mocks.hashPassword).toHaveBeenCalledWith("123456");

      expect(mocks.create).toHaveBeenCalledWith({
        name: "Juan",
        email: "test@test.com",
        password: "hashed-password",
      });

      expect(result).toEqual({
        id: 1,
        name: "Juan",
        email: "test@test.com",
      });
    });
  });
});
