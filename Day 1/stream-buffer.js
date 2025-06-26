const http = require('http')
const fs = require('fs')

//creating a server using raw node.js


const server = http.createServer()

// Listener

server.on('request',(req,res)=>{
    if(req.url ==='/readfile' && req.method === 'GET');
    // file streaming for read
    const readableStream = fs.createReadStream(process.cwd() + '/text/readbhul.txt')
    readableStream.on('data',(buffer)=>{
        res.statusCode = 200;
        res.write(buffer)
    })

    readableStream.on('end',()=>{
        res.end('The streaming is over!')
    })
    readableStream.on('error',() =>{
        res.statusCode = 500;
        res.end('something went wrong!')
    })
})

server.listen(5000,()=>{
    console.log(`server is listening on port 5000`);
})