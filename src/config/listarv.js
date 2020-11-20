const fs = require('fs').promises
import path from 'path'

export async function loadarv(){
    const list = await fs.readdir(path.resolve(__dirname, '..', 'tmp', 'img'))
    return list
}

export function deletefile(nameFile){
    const roadFile = `${path.resolve(__dirname, '..', 'tmp', 'img')}/${nameFile}`
    fs.unlink(roadFile)
}