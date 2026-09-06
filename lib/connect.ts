import mongoose from "mongoose";

const MONGGO_URI = process.env.CONNECTION_STRING as string;

if (!MONGGO_URI) {
  console.log("Missing connection string");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any) = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGGO_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("Database Active");
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
