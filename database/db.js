import mongoose from "mongoose";
import express from 'express';
import 'dotenv/config'

const app = express();

const connectDb = async () => {
    try {
    
        let db = await mongoose.connect(process.env.MONGO_URL);

        if(db){
            app.listen(process.env.PORT, () => {
                console.log("Successfully connected to MongoDB");
                console.log("server is running"); 
            })
        }

        
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

export {connectDb, app}
