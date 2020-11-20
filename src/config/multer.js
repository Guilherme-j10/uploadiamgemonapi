import cript from 'cript'
import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

export default {
    dest: path.resolve(__dirname, '..', 'tmp', 'img'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp', 'img'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err)

                const fileName = `${hash.toString('hex')}-${file.originalname}`

                cb(null, fileName)
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const passType = ['image/png', 'image/jpg', 'image/jpeg'];

        if(passType.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error('Formato de arquivo não permitido'))
        }
    }
}