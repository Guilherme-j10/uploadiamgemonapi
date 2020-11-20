import express from 'express'
import multer from 'multer';
import multerConfig from './config/multer';
import path from 'path'
import { loadarv, deletefile } from './config/listarv';
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '..')))

app.post('/', multer(multerConfig).single('single'), (req, res) => {res.json('ola mundo')})

app.get('/dir', async (req, res) => {
    const paths = await loadarv()
    res.json(paths);
})

app.delete('/dir/:filename?', async (req, res) => {
    await deletefile(req.params.filename)
    res.json(await loadarv())
})

app.listen(3333, () => { console.log('Acesse em http://localhost:3333') })