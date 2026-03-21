"use strict";
import { config } from "dotenv" // <-- debe que iniciarse antesde de las rutas
config();
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("No se encontro la url en el .env");
        }

        await mongoose.connect(uri);
        console.log("Se logro Yei");
    } catch (error) {
        // Es mejor ver el error real que solo decir "muerte fatal" para debuguear
        console.error('Error crítico al conectar a la base de datos:', error);
        process.exit(1);
    }
};

/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<db_username>:<db_password>@app.sh26edb.mongodb.net/?appName=app";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
 */