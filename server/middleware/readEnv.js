import fs from 'fs';
import path from 'path';

const env = { ...process.env }
let filePath = path.join(__dirname, '../../.env')
if (process.env.NODE_ENV == 'prod' || process.env.NODE_ENV == 'production') {
  filePath = path.join(__dirname, '../../.env.production')
}
let res = fs.readFileSync(filePath, 'utf-8')
res = res.split('\n')
res.forEach(item => {
  let itemArr = item.split('=')
  process.env[itemArr[0]] = itemArr[1]
})