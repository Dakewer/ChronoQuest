import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Application } from "express";
import { config } from "dotenv";
import User from "../models/user";

config();

export function googleAuthMiddlware(app: Application) {
    const googleStrategy = new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/auth/google/confirm",
    }, async (accessToken, refreshToken, profile, cb) => {
    try {
        // Buscar si ya existe el googleID
        let user = await User.findOne({ googleID: profile.id });

        // creear usuario
        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails?.[0].value,
                googleID: profile.id,
                photo: profile.photos?.[0].value, // aqui se puede suvir las fotos a aws
                creation_date: new Date()
            });
            await user.save();
        }

        cb(null, user);
    } catch (error) {
        cb(error);
    }
    });
    passport.use(googleStrategy);
}
