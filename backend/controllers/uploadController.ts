import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import { v4 as uuid } from 'uuid'
import { type Response, type Request } from 'express'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req: Request, _file: any, cb: any) {
    cb(null, `${Date.now()}.jpg`)
  }
})

const setLocal = multer({ storage })
const singleLocal = setLocal.single('image')

export const uploadLocal = (req: Request, res: Response) => {
  singleLocal(req, res, function (err) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(`/${req.file.path}`)
    }
  })
}

const s3 = new aws.S3() as any
const storageS3 = multerS3({
  s3,
  bucket: 'myproshop',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  key: function (_req, file, cb) {
    cb(null, uuid() + '-' + file.originalname)
  }
})

const setS3 = multer({ storage: storageS3 })
const singleS3 = setS3.single('file')

export const uploadS3 = (req: Request, res: Response) => {
  singleS3(req, res, function (err) {
    if (err) {
      console.log(err)
    } else {
      res.send(req.file.location)
    }
  })
}
