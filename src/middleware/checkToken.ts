import { config } from "dotenv"
config();
import {Request, Response, NextFunction} from "express";
import jwt, {JwtPayload} from "jsonwebtoken"
// import { Usuario } from "../models/express";

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
   let token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token)
        return res.status(401).json({ mensaje: "No veo toquen, maldito pobre." });
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) 
            return res.status(500).json({ mensaje: "No se puede aceder al .env." });

        const decoded = jwt.verify(token, secret) as JwtPayload & { id?: string; email?: string; name?: string };
        req.Usuario = {
            id: decoded.id,
            email: decoded.email,
            nombre: decoded.name
        };
        next();     
    } 
    catch (error) {
        return res.status(401).json({ mensaje: "Token inválido." });
    }
}