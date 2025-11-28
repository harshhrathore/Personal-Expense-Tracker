import mongoose from "mongoose";

export const connectDB = async (req, res) => {
    const db = "mongodb+srv://rauneet:rauneet@cluster0.3vszonm.mongodb.net/";

    const {connection} = await mongoose.connect(db, { useNewUrlParser: true });

    console.log(`MongoDB Connected to ${connection.host}`);

}