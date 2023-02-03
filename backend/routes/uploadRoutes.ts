import express from 'express'
import { uploadLocal, uploadS3 } from '../controllers/uploadController'

const router = express.Router()

router.post('/', uploadLocal)
router.post('/s3', uploadS3)

// TODO: use named export as opposed to default export
export default router
