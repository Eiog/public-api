import { Router } from 'express'
import { getIpAddressHandler } from '../controller/ip-address.controller'
const router = Router()
router.get('/', getIpAddressHandler)
export default router