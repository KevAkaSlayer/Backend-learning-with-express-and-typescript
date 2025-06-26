const fs = require('fs')

const readText = fs.readFileSync('./text/read.txt','utf-8')

const writtenText = fs.writeFileSync('./text/write.txt',readText + 'This is my written text')

console.log(writtenText);




