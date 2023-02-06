import express from 'express'
import { uploadLocal, uploadS3 } from '../controllers/uploadController'

export const uploadRoutes = express.Router()

uploadRoutes.post('/', uploadLocal)
uploadRoutes.post('/s3', uploadS3)
