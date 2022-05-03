import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(
  request: Request,
  response: Response,
  next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token missing!"
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "916b14d13276f1fb5eea8ff292fa28d8") as IPayload;

    request.id_client = sub;

    return next();

  } catch (err) {
    return response.status(401).json({
      message: "Invalid Token!"
    });
  }
}