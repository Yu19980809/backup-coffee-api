import express from 'express'
import { fetchAllOrders, deleteOrder, deleteOrders } from '../controllers/web/order.js'

const router = express.Router()

router.get( '/web', fetchAllOrders )
router.delete( '/web/single/:id', deleteOrder )
router.delete( '/web/multi', deleteOrders )

export default router
