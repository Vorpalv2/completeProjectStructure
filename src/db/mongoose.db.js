import mongoose from "mongoose";

async function connectTODB() {
  try {
    mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
  } catch (error) {
    console.error("error: ", error);
  }
}

export { connectTODB };
