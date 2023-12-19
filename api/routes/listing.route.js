import express from 'express'
import { createListing, deleteListing, updateListing } from '../controllers/listing.controller.js'
import { AuthToken } from '../utils/Auth.js'

const router = express.Router()

router.post('/create', AuthToken, createListing)
router.delete('/delete/:id', AuthToken, deleteListing)
router.post('/update/:id', AuthToken, updateListing)

export default router