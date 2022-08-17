import { Request, Response } from 'express'
export const getIpAddressHandler = async (req: Request, res: Response) => {
    res.send('getIpAddressHandler')
}
