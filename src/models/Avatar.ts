"use strict";

// los elementos del mongo como las estadisticas del pj
import mongose from "mogoose";
const pj = "avatar";

// falta reyenar
const Avatar = new mongose.Schema ({
    // elemementos del avatar
    name : {
        type: String,
        required: true
    },
})

// crear colecion
const avatar = mongose.model("Avatar", Avatar);
export default avatar;