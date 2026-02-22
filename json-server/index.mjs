import fs from 'fs'
import path from 'path'
import jsonServer from 'json-server'
import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create()
const SECRET_KEY = 'secret_key_123'

server.use(async (reg, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 800)
    })
    next()
})

server.use((req, res, next) => {
    // Разрешаем доступ любому домену (*)
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Разрешаем стандартные методы и заголовки
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Обработка Preflight-запроса (браузер сначала шлет OPTIONS)
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});

server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' })
    }
    next()
})

server.use(jsonServer.defaults())


server.post('/login', (req, res) => {
    try {
    const { username, password } = req.body
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'))
    const { users = [] } = db

    const userFromBd = users.find(
        user => user.username === username && user.password === password
    )

    if (userFromBd) {
        const token = jwt.sign(
            { id: userFromBd.id, username: userFromBd.username},
            SECRET_KEY,
            { expiresIn: '12h' }
        )
        return res.json({
            ...userFromBd,
            token
        })
    }

    return res.status(403).json({ message: 'User not found' })
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: e.message})
    }
})

server.use((req, res, next) => {
    if (req.path === '/login') return next()
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(403).json({message: 'AUTH ERROR: No token provided'})
    }

    const token = authHeader.split(' ')[1]

    try {
        const verify = jwt.verify(token, SECRET_KEY)
        req.user = verify
        next()
    } catch (e) {
        console.log(e.message)
        return res.status(403).json({message: 'AUTH ERROR: Invalid token'})
    }
})

const router = jsonServer.router(path.resolve(__dirname, 'db.json'))
server.use(router)

server.listen(8000, () => {
    console.log('server is running on 8000 port')
})
