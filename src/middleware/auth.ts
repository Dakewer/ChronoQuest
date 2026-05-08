import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Application, Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";

config();

export function googleAuthMiddlware(app: Application) {
    const googleStrategy = new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/auth/google/confirm",
    }, (accessToken, refreshToken, profile, cb) => {
        cb(null, profile);
    });

    passport.use(googleStrategy);
}
