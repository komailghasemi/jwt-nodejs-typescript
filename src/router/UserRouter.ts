import express from 'express'
import { AuthHandler } from '../middleware/auth/AuthHandler'
import { UserController } from '../controller/UserController'

const router = express.Router()

router.get('/me', AuthHandler.auth, UserController.me)


export = router