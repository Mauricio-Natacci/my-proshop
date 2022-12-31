import express from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import { v4 as uuid } from 'uuid'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`)
  },
})
const upload = multer({ storage })
const router = express.Router()
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

const s3 = new aws.S3()
const storageS3 = multerS3({
  s3,
  bucket: 'myproshop',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  key: function (req, file, cb) {
    cb(null, uuid() + '-' + file.originalname)
  },
})

const uploadS3 = multer({ storage: storageS3 })
const middleware = uploadS3.single('file')
router.post('/s3', (req, res) => {
  middleware(req, res, function (err) {
    if (err) {
      console.log(err)
    } else {
      res.send(req.file.location)
    }
  })
})
export default router
