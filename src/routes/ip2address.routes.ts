import { Router } from 'express'
import { ip2ddressHandler } from '../controller/ip2ddress.controller'
const router = Router()
router.get('/', ip2ddressHandler)
export default router