"use strict";
import mongoose from 'mongoose';

// const uri = "mongodb+srv://db_username:<db_password>@chronoquest.sh26edb.mongodb.net/ChronoQuest?retryWrites=true&w=majority&appName=ChronoQuest";
const uri = "mongodb+srv://Apolo:<Gundam>@chronoquest.sh26edb.mongodb.net/ChronoQuest?retryWrites=true&w=majority&appName=ChronoQuest";;

'mongodb+srv://adminuser:admin123@proyecto.awsmpuw.mongodb.net/test_local?retryWrites=true&w=majority&appName=Proyecto'

export const connectDB = async () => {
    try {
        // Conectamos usando la variable uri
        await mongoose.connect(uri);
        // console.log("Base de datos conectada");
    } catch (error) {
        console.error('Error al conectar, muerte fatal', error);
        // Salimos del proceso si hay un error crítico
        process.exit(1);
    }
};

/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<db_username>:<db_password>@chronoquest.sh26edb.mongodb.net/?appName=ChronoQuest";
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