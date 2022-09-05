// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from "express";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}
