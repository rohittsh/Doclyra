import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    mongoose.connection.on('connected', () => console.log("Database Connected"));
    await mongoose.connect(uri);
};

export default connectDB;

// Do not use '@' symbol in your database user's password else it will show an error.