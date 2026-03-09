import type { UserType } from "./UserType.ts";

export {}; 

declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload | string;
    }
  }
}