import express from 'express'
import { addGroup, fetchAllGroups, modifyGroup, deleteSingleGroup, deleteGroups } from '../controllers/web/group.js'

const router = express.Router()

router.post( '/web', addGroup )
router.get( '/web', fetchAllGroups )
router.patch( '/web', modifyGroup )
router.delete( '/web/single/:id', deleteSingleGroup )
router.delete( '/web', deleteGroups )

export default router
