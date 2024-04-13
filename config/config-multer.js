// import mongoose from "mongoose";
// import multer from "multer";
// import { GridFSBucket } from "mongodb";
// import dotenv from "dotenv";
// import { Stream } from "stream";
// dotenv.config();

// const storage = multer.memoryStorage();
// export const upload = multer({ storage });

// const uriDb = process.env.COSMOS_DB_CONNECTION_STRING;
// const db = process.env.DB_NAME || "db-contacts";

// mongoose.connect(uriDb, {
//   dbName: db,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const conn = mongoose.connection;

// let gfs;

// conn.once("open", () => {
//   (gfs = new GridFSBucket(conn.db, mongoose.mongo)), { bucketName: "uploads" };
// });

// export const saveFileToGridFS = async (file, avatarId) => {
//   try {
//     const oldAvatar = await gfs.find({}).toArray();
//     const foundAvatar = await oldAvatar.find(
//       (item) => item._id.toString() === avatarId
//     );
//     if (foundAvatar) {
//       await gfs.delete(foundAvatar._id);
//     }

//     // Zapisz nowy plik avatara
//     const uploadStream = gfs.openUploadStream(file.originalname, {
//       contentType: file.mimetype,
//     });
//     const bufferStream = new Stream.PassThrough();
//     bufferStream.end(file.buffer);
//     bufferStream.pipe(uploadStream);

//     return new Promise((resolve, reject) => {
//       uploadStream.on("error", (error) => {
//         reject(error);
//       });

//       uploadStream.on("finish", () => {
//         resolve(uploadStream.id);
//       });
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// export const streamFileFromGridFS = async (fileId, res) => {
//   try {
//     const fileDataArray = await gfs.find({}).toArray();
//     const fileData = await fileDataArray.find(
//       (item) => item._id.toString() === fileId
//     );
//     const downloadStream = await gfs.openDownloadStream(fileData._id);
//     return await downloadStream.pipe(res);
//   } catch (error) {
//     res.status(404).json({
//       err: "Not an image",
//     });
//   }
// };

import multer from "multer";
import path from "path";

const updatePath = path.join(process.cwd(), "public", "avatars");

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
const mimetypeWhiteList = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/webp",
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, updatePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype.toLowerCase();
    if (
      extensionWhiteList.includes(ext) &&
      mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG, PNG, and GIF files are allowed."
        )
      );
    }
  },
});
