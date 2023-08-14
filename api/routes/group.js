import express from 'express'
import { addGroup, fetchAllGroups, modifyGroup } from '../controllers/web/group.js'

const router = express.Router()

router.post( '/web', addGroup )
router.get( '/web', fetchAllGroups )
router.patch( '/web', modifyGroup )

export default router
