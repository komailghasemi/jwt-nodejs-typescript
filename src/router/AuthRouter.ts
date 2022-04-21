import express from 'express'
import { AuthController } from '../controller/AuthController'

const router = express.Router()

router.post('/signup', AuthController.signUp)
router.post('/signin', AuthController.signIn)
router.post('/refreshtoken', AuthController.refreshToken)


export = router