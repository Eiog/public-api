import { Router } from 'express';
import type { Request, Response } from 'express';
const Searcher = require('../../public/Searcher.js');
const dbPath = './data/ip2region.xdb';
type result = {
  region: string;
  ioCount: number;
  took: number;
};
type address = {
  country?: string;
  region?: string;
  province?: string;
  city?: string;
  ISP?: string;
};
const router = Router();
router.get('/', async (req: Request, res: Response) => {
  const ip = req.query.ip || '';
  if (!ip) return res.send('ip is notfind');
  try {
    // 创建searcher对象
    const searcher = Searcher.newWithFileOnly(dbPath);
    // 查询
    const data = (await searcher.search(ip)) as result;
    const ipData: address = {
      country: data.region.split('|')[0],
      region: data.region.split('|')[1],
      province: data.region.split('|')[2],
      city: data.region.split('|')[3],
      ISP: data.region.split('|')[4],
    };
    res.send({
      ip: ip,
      address: data.region,
      addr: ipData,
    });
  } catch (e) {
    res.status(500).send('error');
  }
});
export default router;
