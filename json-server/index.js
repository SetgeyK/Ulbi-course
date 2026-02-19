import fs from 'fs'
import path from 'path'
import jsonServer from 'json-server'
// import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

server.use(async (reg, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800)
    })
    next()
})

server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERRO' })
    }
    next()
})

server.use(jsonServer.defaults())
server.use(router)

server.post('/login', (req, res) => {
    const { username, password } = req.body
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'))
    const { users } = db

    const userFromBd = users.find(
        user => user.username === username && user.password === password
    )

    if (userFromBd) {
        return res.json(userFromBd)
    }

    return res.status(403).json({ message: 'AUTH ERROR' })
})

server.listen(8000, () => {
    console.log('server is running on 8000 port')
})
