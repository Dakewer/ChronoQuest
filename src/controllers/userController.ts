// Imports
import { config } from "dotenv"
config();

import { Request, Response } from 'express';
import User from '../models/user';
import jwt from "jsonwebtoken";
import path from "path";

const getStringParam = (param: string | string[] | undefined): string | null => {
    if (!param) return null;
    return Array.isArray(param) ? param[0] : param;
};

// Mostrar todos los users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error: any) {
        console.error('Error en getUsers:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los users',
            error: error?.message || 'Error desconocido'
        });
    }
};

// Mostrar usuario por email
export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'El email es requerido'
            });
        }

        const usuario = await User.findOne({ email: email });

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'User no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: usuario
        });
    } catch (error: any) {
        console.error('Error en getUserByEmail:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el usuario',
            error: error?.message || 'Error desconocido'
        });
    }
};

// Mostrar usuario por ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = getStringParam(id);

        if (!idStr) {
            return res.status(400).json({
                success: false,
                message: 'El ID es requerido'
            });
        }

        const user = await User.findById(idStr);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: user
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
export const deleteUserByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'El email es requerido'
            });
        }

        const user = await User.findOneAndDelete({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User eliminado correctamente',
            data: user
        });
    } catch (error: any) {
        console.error('Error en deleteUserByEmail:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el usuario',
            error: error?.message || 'Error desconocido'
        });
    }
};

// Eliminar usuario por ID
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = getStringParam(id);

        if (!idStr) {
            return res.status(400).json({
                success: false,
                message: 'El ID es requerido'
            });
        }

        const usuario = await User.findByIdAndDelete(idStr);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'User no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User eliminado correctamente',
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
export const updateUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;

        // Validar datos requeridos
        if (!userData.name || !userData.email || !userData.creation_date || !userData.password) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos: name, email, creation_date, password'
            });
        }

        // Validar formato de email
        if (!userData.email.includes('@')) {
            return res.status(400).json({
                success: false,
                message: 'El email debe contener @'
            });
        }

        // No se puede cambiar el correo
        if (userData._id) {
            const usuarioExistente = await User.findById(userData._id);
            if (usuarioExistente && usuarioExistente.email !== userData.email) {
                return res.status(400).json({
                    success: false,
                    message: 'No se puede cambiar el email del usuario'
                });
            }
        }

        let usuario = await User.findOne({ email: userData.email });
        if (!usuario) {
            usuario = new User({
                name: userData.name,
                email: userData.email,
                creation_date: userData.creation_date,
                photo: userData.photo,
                descripcion: userData.descripcion,
                googleID: userData.googleID
            });
        } else {
            usuario.name = userData.name;
            usuario.creation_date = userData.creation_date;
            usuario.photo = userData.photo || usuario.photo;
            usuario.descripcion = userData.descripcion || usuario.descripcion;
        }

        if (userData.password)
            await usuario.setPassword(userData.password);
        await usuario.save();

        res.status(200).json({
            success: true,
            message: userData._id ? 'User actualizado' : 'User creado',
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
        const usuario = await User.findOne({ email: email });

        if(!usuario)
            return res.status(404).json({mensaje: "Usuario no encontrado"});

        if (!usuario.password)
            return res.status(403).json({mensaje: "Esta cuenta usa Google para iniciar sesión"});

        const isValidPassword = await usuario.validatePassword(password);
        if(!isValidPassword)
            return res.status(401).json({mensaje: "Contraseña incorrecta"});

        // cambiar a lo que se quiere que el token contenga
        const token = jwt.sign({
            id: usuario._id.toString(),
            email: usuario.email,
            name: usuario.name
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