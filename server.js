import app from "./app.js";
import mongoose from "mongoose";
// import { initUploadFolders } from "./config/config-multer.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.COSMOS_DB_CONNECTION_STRING;
const db = process.env.DB_NAME || "hematobieg";

const startServer = async () => {
  try {
    await mongoose.connect(uriDb, {
      dbName: db,
    });
    console.log(`Database connection successful`);
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
};

startServer();
