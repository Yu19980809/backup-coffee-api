import express from 'express'
import { addUser, fetchAllUsers, giveVip } from '../controllers/web/user.js'

const router = express.Router()

router.post( '/web', addUser )
router.get( '/web', fetchAllUsers )
router.patch( '/web/vip', giveVip )

export default router
