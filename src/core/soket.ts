import { Server as SocketServer } from "socket.io";

let contador = 0;
let socketServer: SocketServer | null = null;

export const motivacion = (io: SocketServer) => {
    socketServer = io;

    io.on("connection", (socket) => {
        console.log("Usuario conectado:", socket.id);

        socket.on("disconnect", () => {
            console.log("Usuario desconectado (troste):", socket.id);
        });
    });
};

export const broadcastClanUpdate = (data: { username: string; missionName: string }) => {
    if (!socketServer) return;
    contador++;
    console.log(`${data.username} completó: ${data.missionName}. Total:`, contador);

    socketServer.emit("clan", {
        total: contador,
        username: data.username,
        misionName: data.missionName,
    });
};

export const getContador = () => contador;