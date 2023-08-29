import express from 'express'
import { fetchAddressListWeapp } from '../controllers/weapp/address.js'

const router = express.Router()

router.get( '/weapp', fetchAddressListWeapp )

export default router
