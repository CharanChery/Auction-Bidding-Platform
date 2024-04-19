// server.js
const connectDb = require("./db/connect")
const express = require('express');
const cors =require('cors')
const app = express()
const tasks = require("./routers/tasks")
require('dotenv').config()

//middleware
app.use(express.static("./public"))
app.use(cors())
app.use(express.json())


//app.post('/api/v1/details/login) - check the details
//app.post('/api/v1/details/signup') - add the details

app.use("/api/v1/details",tasks)

const start = async()=>{
  try {
    await connectDb(process.env.connect_url)
    app.listen(5500,()=>{
      console.log("Running at 5500")
    })
  } catch (err) {
    console.log(err)
  }
}
start()




