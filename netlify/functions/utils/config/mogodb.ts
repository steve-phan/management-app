import mongoose from "mongoose";

let conn: typeof mongoose | null = null;

const url =
  "mongodb+srv://teddy:a3AZ8KkRvxmfFwP@cluster0.nanpu.mongodb.net/?retryWrites=true&w=majority";

export const connectMongoDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI!);
    if (conn == null) {
      conn = await mongoose.connect(process.env.MONGO_URI!, {
        serverSelectionTimeoutMS: 30000,
      });

      // `await`ing connection after assigning to the `conn` variable
      // to avoid multiple function calls creating new connections
    }
    console.log("MongoDb connected");
    return conn;
  } catch (error) {
    throw Error(`MongoDB connect fail: ${JSON.stringify(error)}`);
  }
};
