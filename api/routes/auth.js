import express from 'express'
import { loginWeb } from '../controllers/web/auth.js'
import { loginWeapp } from '../controllers/weapp/auth.js'

const router = express.Router()

router.post( '/login/web', loginWeb )
router.post( '/login/weapp', loginWeapp )

export default router
