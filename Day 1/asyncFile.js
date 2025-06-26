const fs = require('fs')


//reading text asynchronously 

fs.readFile('./text/read.txt','utf-8',(err,data)=>{
    if(err){
        throw Error('error reading data')
    }

    //writing text async

    fs.writeFile('./text/written.txt',data + 'This is added text','utf-8',(err) =>{
        if(err){
            throw Error('Error writing data')
        }
    })
})

console.log("heavy testing");