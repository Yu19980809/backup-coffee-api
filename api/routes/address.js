import express from 'express'
import auth from '../middleware/auth.js'
import { fetchAddressListWeapp, addAddressWeapp } from '../controllers/weapp/address.js'

const router = express.Router()

router.get( '/weapp', auth, fetchAddressListWeapp )
router.post( '/weapp', auth, addAddressWeapp )

export default router
