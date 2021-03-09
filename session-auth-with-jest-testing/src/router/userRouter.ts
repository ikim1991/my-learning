import express from "express"
import controller from "../controller"
import middleware from "../middleware"

const router = express.Router()
const { getHome, postRegister, postLogin, getUser, postLogout } = controller.user
const { authenticate } = middleware

router.get('/', getHome)
router.post('/register', postRegister)
router.post('/login', postLogin)
router.get('/user', authenticate, getUser)
router.post('/logout', authenticate, postLogout)

export default router;