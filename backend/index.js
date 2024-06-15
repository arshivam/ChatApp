import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";

dotenv.config({});

const app = express()
const port = process.env.PORT || 8080;
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api/v1/user", userRoute)
//http://localhost:8080/api/vi/user/register
app.use("/api/v1/message", messageRoute)

app.listen(port, () => {
  connectDB()
  console.log(`Example app listening on port ${port}`)
})