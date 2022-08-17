import { Express, Request, Response, Router } from 'express'
import ipAddressRoute from './ip-address.routes'
interface RouterConf {
    path: string,
    router: Router,
    meta?: unknown
}
const routes: RouterConf[] = [
    {
        path: '/ip',
        router: ipAddressRoute
    }
]
const useRouter = async (app: Express) => {
    app.get('/', (req: Request, res: Response) => {
        const routerMap = routes.map(item => item.path)
        res.send(routerMap)
    })
    routes.forEach(({ path, router }) => app.use(path, router))
}
export default useRouter