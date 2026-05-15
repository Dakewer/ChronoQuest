import { Server as SocketServer } from "socket.io";

let contador = 0;

export const motivacion = (io: SocketServer) => {
    io.on("connection", (socket) => {
        console.log("Usuario conectado:", socket.id);

        // activar el evento despues de una mision
        socket.on("mision", (data: { username: string, misionName: string }) => {
            contador++;
            console.log(`${data.username} completó: ${data.misionName}. Total:`, contador);

            // brodcast
            io.emit("clan", {
                total: contador,
                username: data.username,
                misionName: data.misionName
            });
        });

        socket.on("disconnect", () => {
            console.log("Usuario desconectado (troste):", socket.id);
        });
    });
};

export const getContador = () => contador;