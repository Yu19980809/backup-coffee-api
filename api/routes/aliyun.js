import express from 'express'
import { generateUploadParams } from '../controllers/weapp/aliyun.js'

const router = express.Router()

router.get( '/weapp', generateUploadParams )

export default router
