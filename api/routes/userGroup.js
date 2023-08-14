import express from 'express'
import { addUserGroup } from '../controllers/web/userGroup.js'

const router = express.Router()

router.post( '/web', addUserGroup )

export default router
