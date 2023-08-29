import express from 'express'
import { fetchAllCommodities, addCommodity, setCommodityOn, setCommodityOff, offCommodities, modifyCommoditiesCategory, editCommodity, deleteCommodity } from '../controllers/web/commodity.js'
import { fetchAllCommoditiesWeapp } from '../controllers/weapp/commodity.js'

const router = express.Router()

// WEB
router.get( '/web', fetchAllCommodities )
router.post( '/web/on/:id', setCommodityOn )
router.post( '/web/off_single/:id', setCommodityOff )
router.post( '/web/off_multiple', offCommodities )
router.post( '/web/categories', modifyCommoditiesCategory )
router.post( '/web', addCommodity )
router.patch( '/web', editCommodity )
router.delete( '/web/:id', deleteCommodity )

// WEAPP
router.get( '/weapp', fetchAllCommoditiesWeapp )

export default router
