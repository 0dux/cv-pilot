import jwt, { type SignOptions } from "jsonwebtoken";

const getJwtSecret = (): string => {
  const secret = process.env["JWT_SECRET"];
  if (!secret) throw new Error("JWT_SECRET not set!!!");
  return secret;
};

export const signToken = (payload: object | string, expiresIn: any = "2d") => {
  const secret = getJwtSecret();
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string) => {
  const secret = getJwtSecret();
  return jwt.verify(token, secret);
};
