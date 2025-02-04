import { Request } from "express";
import { expressjwt as jwt } from "express-jwt";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET missing in environment");
}

function getTokenInHeader(req: Request) {
  const authorization = req.headers.authorization;
  if (!authorization) return;
  if (authorization.split(" ").length != 2) return;
  const [tag, token] = authorization.split(" ");
  if (tag === "Token" || tag === "Bearer") return token;
  return;
}

export const authenticate = jwt({
  algorithms: ["HS256"],
  secret: JWT_SECRET,
  getToken: getTokenInHeader,
});

export const optionalAuthenticate = jwt({
  algorithms: ["HS256"],
  secret: JWT_SECRET,
  credentialsRequired: false,
  getToken: getTokenInHeader,
});
