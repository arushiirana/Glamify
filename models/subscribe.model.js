import mongoose, {Schema} from "mongoose";


const subscribeSchema = new Schema(
    {
      email: {
        type: String,
        required: [true, 'Email is required'], 
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please provide a valid email address'], // Email validation regex
        lowercase: true, 
        trim: true, 
      },
    },
    {
      timestamps: true,  
    }
  );
  

export const Subscribe = mongoose.model("Subscribe", subscribeSchema);
