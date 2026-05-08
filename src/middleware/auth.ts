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

// verificar la secion rutas
export const autentificar = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ mensaje: "No se puede acceder al .env." });
        }

        const decoded = jwt.verify(token, secret) as JwtPayload & { id?: string; email?: string; name?: string };
        req.Usuario = {
            id: decoded.id,
            email: decoded.email,
            nombre: decoded.name
        };
        next();
    }
    catch (error) {
        return res.redirect("/login");
    }
}