const http = require('http')

const server = http.createServer((req,res)=>{
    res.setHeader('content-type','text/html')
    if (req.url==='/'){
        res.write(
            `<a href="/about">Go to about</a>`
        )
        res.end()
    }
    else if (req.url==='/about'){
        res.write(
            `<a href="/">Go to home</a>`
        )
        res.end()
    }
    else{
        res.write(
            `<h1>Wrong page</h1>
            <a href="/">Go to home</a>`
        )
        res.end()
    }
})

server.listen(5000)