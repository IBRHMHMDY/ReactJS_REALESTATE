import express from 'express'
import { createListing } from '../controllers/listing.controller.js'
import { AuthToken } from '../utils/Auth.js'

const router = express.Router()

router.post('/create', AuthToken, createListing)

export default router