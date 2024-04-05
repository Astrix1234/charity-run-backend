import multer from "multer";
import { GridFSBucket } from "mongodb";
import dotenv from "dotenv";
import { Stream } from "stream";
dotenv.config();

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const initUploadFolders = async () => {
  await setupFolder(publicDir);
  await setupFolder(tempDir);
  await setupFolder(storeImageDir);
};

const tempDir = path.join(process.cwd(), "tmp");
const publicDir = path.join(process.cwd(), "public");
const storeImageDir = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${nanoid()}${path.extname(file.originalname)}`);
  },
});

let gfs;

conn.once("open", () => {
  (gfs = new GridFSBucket(conn.db, mongoose.mongo)), { bucketName: "uploads" };
});

export const saveFileToGridFS = async (file, avatarId) => {
  try {
    const oldAvatar = await gfs.find({}).toArray();
    const foundAvatar = await oldAvatar.find(
      (item) => item._id.toString() === avatarId
    );
    if (foundAvatar) {
      await gfs.delete(foundAvatar._id);
    }

    // Zapisz nowy plik avatara
    const uploadStream = gfs.openUploadStream(file.originalname, {
      contentType: file.mimetype,
    });
    const bufferStream = new Stream.PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(uploadStream);

    return new Promise((resolve, reject) => {
      uploadStream.on("error", (error) => {
        reject(error);
      });

      uploadStream.on("finish", () => {
        resolve(uploadStream.id);
      });
    });
  } catch (error) {
    throw error;
  }
};

export const streamFileFromGridFS = async (fileId, res) => {
  try {
    const fileDataArray = await gfs.find({}).toArray();
    const fileData = await fileDataArray.find(
      (item) => item._id.toString() === fileId
    );
    const downloadStream = await gfs.openDownloadStream(fileData._id);
    return await downloadStream.pipe(res);
  } catch (error) {
    res.status(404).json({
      err: "Not an image",
    });
  }
};
