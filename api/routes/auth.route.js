import express from 'express'
import { signin, signup, withGoogle } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', withGoogle)

export default router