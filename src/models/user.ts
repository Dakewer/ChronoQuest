// Imports
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
//bcryptjs @types/bcryptjs o cripto.js

const saltRounds = 10;

// Interfaz
export interface IUser extends Document {
    name: string;
    email: string;
    password?: string; // Opcional por googleID
    creation_date: Date;
    photo: string;
    avatar?: mongoose.Types.ObjectId;
    descripcion?: string;
    googleID?: string;
    setPassword(password: string): Promise<void>;
    validatePassword(unhashed: string): Promise<boolean>;
}

// Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /@/
    },
    password: {
        type: String,
        required: false
    },
    creation_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    // revisar
    photo: {
        type: String,
        required: false,
        default: "default.png"
    },
    avatar: {
        type: Schema.Types.ObjectId, // Asi se hacen las referencia, cambiar en los demas modelos
        ref: "Avatar",
        required: false
    },
    descripcion: {
        type: String,
        required: false
    },
    // golge id
    googleID: {
        type: String,
        required: false
    }
});

userSchema.method("setPassword", async function(this: IUser, password: string): Promise<void> {
    this.password = await bcrypt.hash(password, saltRounds);
});

userSchema.method("validatePassword", async function(this: IUser, unhashed: string): Promise<boolean> {
    // puede ser falso por google
    if (!this.password)
        return false;
    return bcrypt.compare(unhashed, this.password);
});

// Exports
const User = mongoose.model("User", userSchema);
export default User;