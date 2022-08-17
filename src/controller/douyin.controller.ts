import { Request, Response } from 'express'
export const getDyRealUrl = async (req: Request, res: Response) => {
    const url = req.query.url || ''
    res.send(url)
}