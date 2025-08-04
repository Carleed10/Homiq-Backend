const express = require("express")
const env = require("dotenv").config()
const app = express()
const dbConnect = require("./Config/dbConnect")
const userRouter = require("./Routes/userRoute")

app.use(express.json({extended : true, limit : "50mb" }))

app.use("/api/user", userRouter)



app.listen(process.env.PORT, ()=>{
    console.log(`App is running perfectly on http://localhost:${process.env.PORT}`);
    
})

dbConnect()