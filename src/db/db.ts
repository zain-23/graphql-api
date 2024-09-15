import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect("mongodb://127.0.0.1/27017", {
      dbName: "graphql",
    });
    console.log("Connected to db", connection.connection.host);
  } catch (error) {
    throw new Error("MONGODB ERROR");
  }
};
