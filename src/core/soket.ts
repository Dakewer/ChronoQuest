import { Server as SocketServer } from "socket.io";

let contador = 0;

export const motivacion = (io: SocketServer) => {
  io.on("connection", (socket) => {
    console.log("Usuario conectado:", socket.id);

    socket.on("contador", () => {
      contador++;
      console.log("Alguien completó una misión. Total:", contador);
      io.emit("contador", { contador });
    });

    // Evento de desconexión
    socket.on("disconnect", () => {
      console.log("Usuario desconectado:", socket.id);
    });
  });
};

export const getContador = () => contador;
export const resetContador = () => {
  contador = 0;
};
