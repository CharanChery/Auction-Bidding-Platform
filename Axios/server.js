// server.js
const connectDb = require("./db/connect")
const express = require('express');
const cors =require('cors')
const app = express()
const tasks = require("./routers/tasks")
const usertasks = require("./routers/usertasks")
const userProducts = require("./routers/userProducts")
const validateTransaction = require('./routers/validateTransaction');
require('dotenv').config()

//middleware
app.use(express.static("./public"))
app.use(cors())
app.use(express.json())


//app.post('/api/v1/details/login) - check the details
//app.post('/api/v1/details/signup') - add the details

app.use("/api/v1/details",tasks)
app.use("/api/v2",usertasks)
app.use('/api/v3',userProducts)
app.use('/api/v4', validateTransaction);



const start = async()=>{
  try {
    await connectDb(process.env.connect_url)
    app.listen(5501,()=>{
      console.log("Running at 5501")
    })
  } catch (err) {
    console.log(err)
  }
}

start()
