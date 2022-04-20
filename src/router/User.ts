import express from 'express'
import { Auth } from '../auth/Auth'
import { User } from '../controller/User'

const router = express.Router()


router.get('/me', Auth.auth, User.me)
router.post('/signup', User.signUp)
router.post('/signin', User.signIn)
router.post('/refreshtoken', User.refreshToken)

export = router