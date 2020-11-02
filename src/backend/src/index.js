// node modules


// npm modules


// own modules


// variables

const express = require('express')
const port = process.env.PORT || 3000
const viewsPath = __dirname

const app = express()


console.log(viewsPath)

// app.use('/', async(req,res)=>{
//     // res.sendFile
// })


app.listen(port,()=>{
    console.log("working on port:", port)
})