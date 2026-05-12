import { config } from "dotenv"
config();
import {Request, Response, NextFunction} from "express";
import jwt, {JwtPayload} from "jsonwebtoken"
// import IUSer from
// import { Usuario } from "../models/express";

// creo que esta puedo exportar directamente la de interfas que hice en usuer
declare global {
    namespace Express {
        interface Request {
            Usuario?: {
                id: string;
                email: string;
                nombre: string | null;
            };
        }
    }
}

export {};

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    // fue el que mas me gusto en clase :)
   let token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;

    if (!token)
        return res.redirect("/login");

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) 
            return res.status(500).json({ mensaje: "No se puede aceder al .env." });

        const decoded = jwt.verify(token, secret) as JwtPayload & { id?: string; email?: string; name?: string; };
        req.Usuario = {
            id: decoded.id!,
            email: decoded.email!,
            nombre: decoded.name ?? null
        };
 
        next();
    } catch (error) {
        return res.redirect("/login");
    }
};