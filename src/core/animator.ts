//import { ClaseAvatar } from "./../../dataBase/mongodb/avatarManager";
import { ClaseAvatar } from "./dataBase/mongodb/avatarManager";

let ruta = "./public/images/clases/";
let claseActual = "Knight"; // despues converir en funcion para que lo encuentre
ruta += ruta + claseActual;

// mapeado
const config = {
  frameWidth: 64,   // ancho 
  frameHeight: 64,  // alto
  animations: {
    idle:  { row: 0, frameCount: 2, fps: 4 },   // fila 0, 2 frames
    happy: { row: 1, frameCount: 4, fps: 8 },   // fila 1, 4 frames
  }
};

// configuraciones
type AnimationName = keyof typeof config.animations;
const sprite = document.getElementById("sprite") as HTMLCanvasElement;
const tipo = sprite.getContext("2d")!;
sprite.width  = config.frameWidth;
sprite.height = config.frameHeight;
const spriteSheet = new Image();
spriteSheet.src = ruta;

let inicio  = 0;
let actual: ReturnType<typeof setInterval> | null = null;
let default: AnimationName = "idle";

// pintar personaje y animación
// idel es infinit ta hasta que exista otra interacion
// hapi se repoduce 2o 3 veces y se quita
const paintAvatar = (animacion: string = "idle") => {
    // Limpiar intervalo anterior
  if (actual) 
    clearInterval(actual);

    default  = animacion;
    default = 0;
    const animcion = config.animations[animacion];

    const draw = () => {
    tipo.clearRect(0, 0, canvas.width, canvas.height);
    tipo.drawImage(
      spriteSheet,
      inicio * config.frameWidth,  // x en el sprite sheet
      animacion.row    * config.frameHeight,  // y en el sprite sheet
      config.frameWidth,
      config.frameHeight,
      0, 0,                              // donde dibujarlo en el canvas
      config.frameWidth,
      config.frameHeight
    );

    inicio++;

    // Si no es idle, parar al terminar los frames
    if (animacion !== "idle" && default >= animacion.frameCount) {
      clearInterval(actual!);
      paintAvatar("idle"); // volver a idle
    } 
    else 
      default = default % animacion.frameCount; // loop para idle
  };

  spriteSheet.onload = () => draw(); // por si aún no cargó
  if (spriteSheet.complete) draw();  // si ya estaba cargada

  actual = setInterval(draw, 1000 / anim.fps);
};

function clickAvatar() {
  paintAvatar("happy");
}

sprite.addEventListener("click", clickAvatar);

// iniciar en idle
spriteSheet.onload = () => paintAvatar("idle");