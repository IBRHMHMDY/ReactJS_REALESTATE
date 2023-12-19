import express from 'express'
import { createListing, deleteListing } from '../controllers/listing.controller.js'
import { AuthToken } from '../utils/Auth.js'

const router = express.Router()

router.post('/create', AuthToken, createListing)
router.delete('/delete/:id', AuthToken, deleteListing)

export default router