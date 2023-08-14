import express from 'express'
import { fetchAllMembers, addMember, modifiyMembersRole, deleteMembers } from '../controllers/web/member.js'

const router = express.Router()

router.get( '/web', fetchAllMembers )
router.post( '/web', addMember )
router.patch( '/web', modifiyMembersRole )
router.delete( '/web', deleteMembers )

export default router
