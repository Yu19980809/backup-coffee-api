import express from 'express'
import { addCategory } from '../controllers/web/category.js'

const router = express.Router()

router.post( '/web/', addCategory )

export default router
