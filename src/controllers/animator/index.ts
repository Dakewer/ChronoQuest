//import { ClaseAvatar } from "./../../dataBase/mongodb/avatarManager";
import { ClaseAvatar } from "./dataBase/mongodb/avatarManager";
import fs from "fs";
import path from "path";

let ruta = "./public/images/clases/";

function contarArchivos(ruta: string): number {
    try {
        const archivos = fs.readdirSync(ruta);
        return archivos.length;
    } catch (error) {
        console.error("Error al leer la carpeta:", error);
        return 0;
    }
}

const sprite = document.getElementById("sprite") as HTMLImageElement;

// por el momento unico con animaciones
const rutasClases: Record<ClaseAvatar, string> = {
    [ClaseAvatar.Knight]: "Knight",
    [ClaseAvatar.Aprendiz]: "aprendiz",
    [ClaseAvatar.Mago]: "mago",
    [ClaseAvatar.Espadachin]: "espadachin",
    [ClaseAvatar.Nigromante]: "nigromante"
};

// cambiar despues
const clase = ClaseAvatar.Knight;

ruta += rutasClases[clase];

let frame: number;

// pintar personaje y animación
const paintAvatar = (animacion: string = "idle") => {
    const nuevaRuta = ruta + "/" + animacion;
    const n = contarArchivos(nuevaRuta);

    let i = 1;

    if (frame)
        clearInterval(frame);

    frame = window.setInterval(() => {
        if (i > n)
            i = 1;

        const framePath = "${nuevaRuta}/${animacion}/${i}.png";
        sprite.src = framePath;

        i++;
    }, 100); // velocidad de animación
};

function clickAvatar() {
    paintAvatar("happy");

    setTimeout(() => {
        paintAvatar("idle");
    }, 1000);
}

sprite.addEventListener("click", clickAvatar);

// iniciar en idle
paintAvatar("idle");