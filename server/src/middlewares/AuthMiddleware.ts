import { NextFunction, Request, Response } from "express";

import jwt from "jwt-simple";

export default async function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  const token = authorization?.split(" ")[1];

  const key = process.env.JWT_HASH_KEY || "loginUser";

  try {
    const userDecoded = await jwt.decode(token || "", key);

    request.user = userDecoded;

    next();
  } catch (e) {
    return response.status(401).json({ message: "Not Authorized" });
  }
}
