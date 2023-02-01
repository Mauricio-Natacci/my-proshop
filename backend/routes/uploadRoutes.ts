import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import { v4 as uuid } from "uuid";

// TODO: use the same organization pattern as in the other router files
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req: any, file: any, cb: any) {
    cb(null, `${Date.now()}.jpg`);
  },
});
const upload = multer({ storage });
const router = express.Router();

// TODO: find out how to correctly type req with custom properties
router.post("/", upload.single("image"), (req: any, res) => {
  res.send(`/${req.file.path}`);
});

const s3 = new aws.S3() as any;
const storageS3 = multerS3({
  s3,
  bucket: "myproshop",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, uuid() + "-" + file.originalname);
  },
});

const uploadS3 = multer({ storage: storageS3 });

// TODO: find a better name for this. This is not a middleware
const middleware = uploadS3.single("file");

router.post("/s3", (req: any, res: any) => {
  middleware(req, res, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send(req.file.location);
    }
  });
});

// TODO: use named export as opposed to default export
export default router;
