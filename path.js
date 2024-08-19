const path = require('path')

console.log(path.sep)

const filePath = path.join('./constent','./subfolder','text.txt')
console.log(filePath);

const base = path.basename(filePath)
console.log(base);

const absoluteValue = path.resolve(__dirname, 'content','subfolder','text.js')
console.log(absoluteValue)