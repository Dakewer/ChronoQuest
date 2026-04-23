import { Usuario } from "./Usuario";

// Despues checar con david 

declare global {
    namespace Express {
        interface Request {
            Usuario?: {
                id: number;
                email: string;
                nombre: string | null;
            };
        }
    }
}