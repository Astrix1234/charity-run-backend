import mongoose from "mongoose";
import multer from "multer";
import Grid from "gridfs-stream";

const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });

const uriDb = process.env.DB_HOST;
const db = process.env.DB_NAME || "hematobieg";

mongoose.connect(uriDb, {
  dbName: db,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const conn = mongoose.connection;

export let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});
