import app from "./app.js";
import mongoose from "mongoose";
import { initUploadFolders } from "./config/config-multer.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const startServer = async () => {
  try {
    await initUploadFolders();
    await mongoose.connect(uriDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
