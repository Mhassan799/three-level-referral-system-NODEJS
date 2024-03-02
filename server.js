const express = require('express')
const app = express()
console.log("hello world")
require('dotenv').config({path:'./config.env'})
port = process.env.PORT || 5001
const dbConnect = require('./db/db')
const userRoutes = require('./routes/userRoutes')



// databse call 
dbConnect()


app.use(express.json())
app.use('/api/user',userRoutes)




app.listen(port,()=>{
    console.log(`server is runing on port ${port}`)
})



