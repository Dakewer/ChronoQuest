import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import session from "express-session";
import express from "express";
import {Application} from "express";

export function googleAuthMiddlware(app: Application ) {
    const googleStrategy = new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/auth/google/confirm",
    }, (accessToken, refreshToken, profile, cb) => {})
    passport.use()
}