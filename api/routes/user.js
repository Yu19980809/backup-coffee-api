import express from 'express'
import auth from '../middleware/auth.js'
import { addUser, fetchAllUsers, giveVip } from '../controllers/web/user.js'
import { updateUserInfo } from '../controllers/weapp/user.js'

const router = express.Router()

// WEB
router.post( '/web', addUser )
router.get( '/web', fetchAllUsers )
router.patch( '/web/vip', giveVip )

// WEAPP
router.patch( '/weapp', auth, updateUserInfo )

export default router
