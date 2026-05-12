import multer from "multer";
import path from "path";

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // generar su nombre unico
        const ext = path.extname(file.originalname); // obtener la extension del archivo, porner como en clase lo de que solo se puedan subir imagenes
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // limitar el tamaño del archivo a 2 MB
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname)
            return cb(null, true);

        // cb(new Error("Solo se permiten archivos JPEG, JPG y PNG"), false);
        // cb(null, false);
        cb(new Error("Solo se permiten archivos JPEG, JPG y PNG") as any, false);
    }
});

// verificar imagenes, mover y terminar en mi middlewar
/*
middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // esto es para subir imagenes. lo puse por si algo. pero el plan sigue siendo las imagenes predefinidas

    this.app.use((err:any, req:express.Request, res:express.Response, next:express.NextFunction)=>{

        if(err instanceof multer.MulterError){

            res.status(400).json({
                error:err.message,
            });

        }
        else if(err){

            res.status(500).json({
                error:err.message,
            });

        }
        else
            next();
    })
}
*/