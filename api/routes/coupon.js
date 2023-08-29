import express from 'express'
import { fetchCoupons, onCoupon, offSingleCoupon, offCoupons, addCoupon, editCoupon, deleteCoupon } from '../controllers/web/coupon.js'

const router = express.Router()

router.get( '/web', fetchCoupons )
router.patch( '/web/on/:id', onCoupon )
router.patch( '/web/off_single/:id', offSingleCoupon )
router.patch( '/web/off_multi', offCoupons )
router.post( '/web', addCoupon )
router.patch( '/web', editCoupon )
router.delete( '/web/:id', deleteCoupon )

export default router
