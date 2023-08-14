import express from 'express'
import { addShop } from '../controllers/web/shop.js'

const router = express.Router()

router.post( '/web/', addShop )

export default router
