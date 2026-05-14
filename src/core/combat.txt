// daño = (fuerza * suerte * %ataque) / (defensa * suerte)

// importar el avatar para obtener sus stats
import { Avatar } from "./../models/avatar";
const ciclos = 100
cosnt nciclos = 5
const av // action alue, debe que calcularse por avatar

// agregar estadistica y funcion para saver cuanto falta para el proximo turno despies y restablecer.

// En el controlador del combate
ritmo() {
    // Ordenar personajes por el que tenga menor AV
    characters.Sort((a, b) => a.currentAV.CompareTo(b.currentAV));
    
    Character activeChar = characters[0];
    float timePassed = activeChar.currentAV;

    // Restar el tiempo pasado a todos
    foreach (var c in characters) {
        c.currentAV -= timePassed;
    }

    // El personaje actúa y se reinicia su contador
    ExecuteTurn(activeChar);
    activeChar.ResetAV();
}