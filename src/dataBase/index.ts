"use strict";
import { config } from "dotenv" // <-- debe que iniciarse antesde de las rutas
config();
import mongoose from 'mongoose';

import usuarioSchema from './mongodb/usuariorManager';

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("No se encontro la url en el .env");
        }

        await mongoose.connect(uri);
        console.log("Se logro Yei");
    } catch (error) {
        // Es mejor ver el error real que solo decir "muerte fatal" para debuguear
        console.error('Error crítico al conectar a la base de datos:', error);
        process.exit(1);
    }
};

/*
Flujo
Elmento para buscar generar el email como digo anmol
Usuario: loguin -> Crear o iniciar secion
                -> Ajuste: Cambiar nombre, imagen o descricpion pero no correo (correo)
                -> Mostrar usuario (id/ email)

Mision:
        -> Crear mision (id mision)
        -> Actualizar mision (id mision)
        -> Eliminar mision (id mision)

        -> Musiones actuales (Id usuario + mision active: true)
        -> Mision por tag (Id usuario + mision active: true + tag/tags)

Avar:
        -> Mostrar informacion actual (get one activo true)
        -> Actualizar wind eate (derota o victoria +1 y recalcular el porcentaje de victoria)
        -> Mostra estadisticas, sumar estadisticas de la clase + estadisticas eredadas + estadisticas entrenadas
        -> Actualizar esta disticas (entrenadas) (No se pueden pasar del numero de stad maximas del nivel)

 */