import express from 'express'
import auth from '../middleware/auth.js'
import { fetchAllOrders, deleteOrder, deleteOrders } from '../controllers/web/order.js'
import { generateOrderWeapp } from '../controllers/weapp/order.js'

const router = express.Router()

// WEB
router.get( '/web', fetchAllOrders )
router.delete( '/web/single/:id', deleteOrder )
router.delete( '/web/multi', deleteOrders )

// WEAPP
router.post( '/weapp', auth, generateOrderWeapp )

export default router
