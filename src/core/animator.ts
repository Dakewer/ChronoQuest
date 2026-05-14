//import { ClaseAvatar } from "./../../dataBase/mongodb/avatarManager";

let ruta = "./public/images/clases/";
let claseActual = "Knight"; // despues converir en funcion para que lo encuentre
ruta += claseActual;

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
let defaultAnimation: AnimationName = "idle";
let frameIndex = 0;

// pintar personaje y animación
// idel es infinit ta hasta que exista otra interacion
// hapi se repoduce 2o 3 veces y se quita
const paintAvatar = (animacion: string = "idle") => {
    // Limpiar intervalo anterior
  if (actual) 
    clearInterval(actual);

    defaultAnimation = animacion as AnimationName;
    frameIndex = 0;
    const animcion = config.animations[animacion as AnimationName];

    const draw = () => {
    tipo.clearRect(0, 0, sprite.width, sprite.height);
    tipo.drawImage(
      spriteSheet,
      frameIndex * config.frameWidth,  // x en el sprite sheet
      animcion.row    * config.frameHeight,  // y en el sprite sheet
      config.frameWidth,
      config.frameHeight,
      0, 0,                              // donde dibujarlo en el canvas
      config.frameWidth,
      config.frameHeight
    );

    frameIndex++;

    // Si no es idle, parar al terminar los frames
    if (animacion !== "idle" && frameIndex >= animcion.frameCount) {
      clearInterval(actual!);
      paintAvatar("idle"); // volver a idle
    } 
    else 
       frameIndex = frameIndex % animcion.frameCount; // loop para idle
  };

  spriteSheet.onload = () => draw(); // por si aún no cargó
  if (spriteSheet.complete) draw();  // si ya estaba cargada

  actual = setInterval(draw, 1000 / animcion.fps);
};

function clickAvatar() {
  paintAvatar("happy");
}

sprite.addEventListener("click", clickAvatar);

// iniciar en idle
paintAvatar("idle");