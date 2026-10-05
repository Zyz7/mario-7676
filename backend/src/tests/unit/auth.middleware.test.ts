import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { verifyToken } from "../../utils/jwt";

vi.mock("../../utils/jwt", () => ({
  verifyToken: vi.fn(),
}));

const mockVerifyToken = vi.mocked(verifyToken);

describe("authMiddleware", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {
      headers: {},
    } as Request;

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as Response;

    next = vi.fn();
  });

  it("debe rechazar cuando no existe Authorization", () => {
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "No autenticado",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("debe rechazar cuando Authorization no tiene formato Bearer", () => {
    req.headers.authorization = "Basic abc123";

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Token inválido",
    });

    expect(next).not.toHaveBeenCalled();
    expect(mockVerifyToken).not.toHaveBeenCalled();
  });

  it("debe rechazar cuando el token es inválido", () => {
    req.headers.authorization = "Bearer token-invalido";

    mockVerifyToken.mockImplementation(() => {
      throw new Error("Token inválido");
    });

    authMiddleware(req, res, next);

    expect(mockVerifyToken).toHaveBeenCalledWith("token-invalido");

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Token inválido o expirado",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("debe permitir el acceso cuando el token es válido", () => {
    req.headers.authorization = "Bearer token-valido";

    const user = {
      id: 1,
      name: "Juan",
      email: "juan@test.com",
    };

    mockVerifyToken.mockReturnValue(user);

    authMiddleware(req, res, next);

    expect(mockVerifyToken).toHaveBeenCalledWith("token-valido");

    expect(req.user).toEqual(user);

    expect(next).toHaveBeenCalledOnce();

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
