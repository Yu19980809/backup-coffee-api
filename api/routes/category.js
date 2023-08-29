import express from 'express'
import { addCategory, fetchAllCategories, deleteSingleCategory, deleteCategories } from '../controllers/web/category.js'
import { fetchAllCategoriesWeapp } from '../controllers/weapp/category.js'

const router = express.Router()

// WEB
router.post( '/web', addCategory )
router.get( '/web', fetchAllCategories )
router.delete( '/web/single/:id', deleteSingleCategory )
router.delete( '/web', deleteCategories )

// WEAPP
router.get( '/weapp', fetchAllCategoriesWeapp )

export default router
