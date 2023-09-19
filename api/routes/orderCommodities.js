import express from 'express'
import auth from '../middleware/auth.js'
import { generateOrderCommoditiesWeapp, fetchOrderCommoditiesWeapp } from '../controllers/weapp/orderCommodities.js'

const router = express.Router()

// WEAPP
router.post( '/weapp', generateOrderCommoditiesWeapp )
router.get( '/weapp', auth, fetchOrderCommoditiesWeapp )

export default router
