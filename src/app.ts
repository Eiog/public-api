import express from 'express'
import useRouter from './routes'
const PORT = process.env.PORT || 3702
const app = express()
app.listen(PORT, async () => {
    await useRouter(app)
    console.info(`App is running at http://localhost:${PORT}`)
})