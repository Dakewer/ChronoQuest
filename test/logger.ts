"use strict";

export class Logger {
    private infoInfo : Array<string> = [];
    private infoWarn : Array<string> = [];
    private infoError : Array<string> = [];

    private corecto : number = 0;
    private advertencia : number = 0;
    private problema : number = 0;

    private archibo : boolean = true;
    private terminal : boolean = true;
    private infoB : boolean = true;
    private warnB : boolean = true;
    private errorB : boolean = true;
    private mostar : boolean = true;
    //AUTISMO (DAVID PÁEZ ESCRIBIÓ ESTO)

    // Configuración
    activarArchivo(dato: boolean) {
        this.archibo = !! dato;
    }

    activarTerminal(dato: boolean) {
        this.terminal = !! dato;
    }

    activarConsola(dato: boolean) {
        this.mostar = !! dato;
    }

    activarInfo(dato: boolean) {
        this.infoB = !! dato;
    }

    activarWarn(dato: boolean) {
        this.warnB = !! dato;
    }

    activarError(dato: boolean) {
        this.errorB = !! dato;
    }

    activarTodo() {
        this.infoB = true;
        this.warnB = true;
        this.errorB = true;
    }

    desactivarTodo() {
        this.infoB = false;
        this.warnB = false;
        this.errorB = false;
    }

    // Resumen
    resumen() {
        if (this.mostar && this.terminal)
            this.consola();

        if (this.archibo && this.mostar)
            this.archivo();
    }

    consola() {
        if (this.infoB) {
            console.info("llamadas a funciones " + this.corecto);
            if (this.infoInfo.length > 0)
                for (let i in this.infoInfo)
                    console.log(this.infoInfo[i]);
        }

        if (this.warnB) {
            console.warn("advertencias: " + this.advertencia);
            if (this.infoWarn.length > 0)
                for (let i in this.infoWarn)
                    console.log(this.infoWarn[i]);
        }

        if (this.errorB) {
            console.error("problema: " + this.problema);
            if (this.infoError.length > 0)
                for (let i in this.infoError)
                    console.log(this.infoError[i]);

        }
    }


    archivo() {
        let texto = "";

        if (this.infoB) {
            texto += "llamadas a funciones " + this.corecto + "\n";
            if (this.infoInfo.length > 0)
                for (let i in this.infoInfo)
                    texto += this.infoInfo[i] + "\n";
        }

        if (this.warnB) {
            texto += "advertencias: " + this.advertencia + "\n";
            if (this.infoWarn.length > 0)
                for (let i in this.infoWarn)
                    texto += this.infoWarn[i] + "\n";
        }

        if (this.errorB) {
            texto += "problema: " + this.problema + "\n";
            if (this.infoError.length > 0)
                for (let i in this.infoError)
                    texto += this.infoError[i] + "\n";
        }

        // Crear archivo en js
        const blob = new Blob([texto], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "reporte.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    // Versión sin texto
    infoV() {
        this.corecto++;
        if (this.mostar && this.infoB)
            console.info("todo bien por el momento");
    }

    warnV() {
        this.advertencia++;
        if (this.mostar && this.warnB)
            console.warn("Elemento no previsto encontrado, tener cuidado");
    }

    errorV() {
        this.problema++;
        if (this.mostar && this.errorB)
            console.error("Problema critico entontrado, no explotamos por suerte");

    }

    // versión con texto
    info(text: string | undefined | null) {
        if (text === undefined || text === null)
            this.infoV();

        else {
            this.corecto++;
            this.infoInfo.push(text);

            if (this.mostar && this.infoB)
                console.info("la funcion " + text + " va bien por el momento");
        }
    }

    warn(text: string | undefined | null) {
        if (text === undefined || text === null)
            this.warnV();

        else {
            this.advertencia++;
            this.infoWarn.push(text);
            if (this.mostar && this.warnB)
                console.warn("la funcion " + text + " esta teniendo problemas");
        }
    }

    error(text: string | undefined | null) {
        if (text === undefined || text === null)
            this.errorV();

        else {
            this.problema++;
            this.infoError.push(text);

            if (this.mostar && this.errorB)
                console.error("la funcion " + text + " fallo criticamente");
        }
    }

    reset() {
        this.infoInfo = [];
        this.infoWarn = [];
        this.infoError = [];

        this.corecto = 0;
        this.advertencia = 0;
        this.problema = 0;
    }
}