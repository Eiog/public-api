import { Router } from 'express'
import { getDyRealUrl } from '../controller/douyin.controller'
const router = Router()
router.get('/', getDyRealUrl)
export default router