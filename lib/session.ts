import { User } from "@prisma/client";
import { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  cookieName: 'iron-session/next-example.js',
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}