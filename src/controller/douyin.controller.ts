import { Request, Response } from 'express'
import http from 'http'
import axios from 'axios'
import { request } from 'https'
const _request = (url: string): Promise<http.IncomingMessage> => {
    return new Promise((resolve, reject) => {
        request(url, res => {
            return resolve(res)
        }).on('error', err => {
            return reject(err)
        }).end()
    })
}
export const getDyRealUrl = async (req: Request, res: Response) => {
    const url = req.query.url as string || ''
    const _url = url.match(/https:\/\/v.douyin.com\/[^\s ]*/) ? url.match(/https:\/\/v.douyin.com\/[^\s ]*/)![0] : ''
    if (!_url) return res.status(500).send('地址有误0')
    const { headers } = await _request(_url)
    const locationUrl = headers['location']?.match(/https:[^\s]*/) ? headers['location']?.match(/https:[^\s]*/)![0] : ''
    if (!locationUrl || locationUrl === 'https://www.douyin.com') return res.status(500).send('地址有误1')
    const realId = locationUrl.match(/https:\/\/www.(douyin.com|iesdouyin.com\/share)\/video\/([^?&=\s\/]+)/) ? locationUrl.match(/https:\/\/www.(douyin.com|iesdouyin.com\/share)\/video\/([^?&=\s\/]+)/)![2] : ''
    if (!realId) return res.status(500).send('解析失败')
    const videoInfoUrl = 'https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=' + realId
    const { data: videoInfo } = await axios.get(videoInfoUrl)
    if (!videoInfo) return res.status(500).send('解析失败')
    const videoResult = {
        url: (videoInfo['item_list'][0]['video']['play_addr']['url_list'][0] as string ?? '').replace('playwm', 'play'),
        title: videoInfo['item_list'][0]['desc'] as string ?? '',
        ratio: videoInfo['item_list'][0]['video']['ratio'] as string ?? '',
        cover: videoInfo['item_list'][0]['video']['cover']['url_list'][0] as string ?? '',
    }
    res.send(videoResult)
}