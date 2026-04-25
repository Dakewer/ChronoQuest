// Imports
import { config } from "dotenv"
config();

import { Request, Response } from 'express';
import Usuario from '../models/Usuario';
import jwt from "jsonwebtoken";

// Helper para convertir params a string
const getStringParam = (param: string | string[] | undefined): string | null => {
    if (!param) return null;
    return Array.isArray(param) ? param[0] : param;
};

// Mostrar todos los usuarios
export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.find({});

        res.status(200).json({
            success: true,
            data: usuarios
        });
    } catch (error: any) {
        console.error('Error en getUsuarios:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los usuarios',
            error: error?.message || 'Error desconocido'
        });
    }
};

// Mostrar usuario por email
export const getUsuarioByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'El email es requerido'
            });
        }

        const usuario = await Usuario.findOne({ mail: email });

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: usuario
        });
    } catch (error: any) {
        console.error('Error en getUsuarioByEmail:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el usuario',
            error: error?.message || 'Error desconocido'
        });
    }
};

// Mostrar usuario por ID
export const getUsuarioById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = getStringParam(id);

        if (!idStr) {
            return res.status(400).json({
                success: false,
                message: 'El ID es requerido'
            });
        }

        const usuario = await Usuario.findById(idStr);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: usuario
        });
    } catch (error: any) {
        console.error('Error en getUsuarioById:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el usuario',
            error: error?.message || 'Error desconocido'
        });
    }
};

// Eliminar usuario por email
export const deleteUsuarioByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'El email es requerido'
            });
        }

        const usuario = await Usuario.findOneAndDelete({ mail: email });

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Usuario eliminado correctamente',
            data: usuario
        });
    } catch (error: any) {
        console.error('Error en deleteUsuarioByEmail:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el usuario',
            error: error?.message || 'Error desconocido'
        });
    }
};

// Eliminar usuario por ID
export const deleteUsuarioById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = getStringParam(id);

        if (!idStr) {
            return res.status(400).json({
                success: false,
                message: 'El ID es requerido'
            });
        }

        const usuario = await Usuario.findByIdAndDelete(idStr);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Usuario eliminado correctamente',
            data: usuario
        });
    } catch (error: any) {
        console.error('Error en deleteUsuarioById:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el usuario',
            error: error?.message || 'Error desconocido'
        });
    }
};

// Crear o actualizar usuario (upsert)
export const upsertUsuario = async (req: Request, res: Response) => {
    try {
        const userData = req.body;

        // Validar datos requeridos
        if (!userData.name || !userData.mail || !userData.birday || !userData.password) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos: name, mail, birday, password'
            });
        }

        // Validar formato de email
        if (!userData.mail.includes('@')) {
            return res.status(400).json({
                success: false,
                message: 'El email debe contener @'
            });
        }

        // No se puede cambiar el correo
        if (userData._id) {
            const usuarioExistente = await Usuario.findById(userData._id);
            if (usuarioExistente && usuarioExistente.mail !== userData.mail) {
                return res.status(400).json({
                    success: false,
                    message: 'No se puede cambiar el email del usuario'
                });
            }
        }

        const usuario = await Usuario.findOneAndUpdate(
            { mail: userData.mail },
            userData,
            { upsert: true, new: true }
        );

        res.status(200).json({
            success: true,
            message: userData._id ? 'Usuario actualizado' : 'Usuario creado',
            data: usuario
        });
    } catch (error: any) {
        console.error('Error en upsertUsuario:', error);

        // Manejar error de email duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'El email ya está registrado'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al crear/actualizar el usuario',
            error: error?.message || 'Error desconocido'
        });
    }
};

// Diego esta editando aqui, buajajaja 🔥😈🔥😈🔥😈🔥
// Login de usuario
export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        const usuario = await Usuario.findOne({ where: email });
        const usurioJson = usuario?.toJSON();

        if(!usuario)
            res.status(404).json({mensaje: "Usuario no encontrado"});

        // Despues ambiar
        if(usurioJson?.password !== password)
            res.status(401).json({mensaje: "Contraseña incorrecta"});

        // Revisar la encriptacion con sevilla
        /*
        const validPassword = await BlockedEncryptionTypes$.compare(password, usurioJson?.password);
        if (validPassword)
            res.status(401).json({mensaje: "Contraseña incorrecta"});
        */

        // cambiar a lo que se quiere que el toquen contenga
        const token = jwt.sign({
            mail: usurioJson?.mail,
            name: usurioJson?.name
        }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({ token });
    }
    catch (error: any) {
        res.status(500).json({mensaje: "Todo cambió cuando te vi, uh, uh, uh. De blanco y negro a color me convertí"});
    }
}

export function loginFrom(req: Request, res: Response ) {
    const uri = path.join(__dirname,'../views/login.html');
    res.sendFile(uri);
}

export function googleAuth(req: Request, res: Response) {
    res.redirect("/dashboard");
}

middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // esto es para subir imagenes. lo puse por si algo. pero el plan sigue siendo las imagenes predefinidas
        
        this.app.use((err:any, req:express.Request, res:express.Response, next:express.NextFunction)=>{
            
            if(err instanceof multer.MulterError){

                res.status(400).json({
                    error:err.message,
                });

            }else if(err){

                res.status(500).json({
                    error:err.message,
                });

            }else{
                next();
            }


        })


    }