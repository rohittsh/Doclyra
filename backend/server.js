import express from "express"
import cors from 'cors'
import 'dotenv/config'
import { createServer } from "http"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import initSocket from "./config/socket.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const httpServer = createServer(app)
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
initSocket(httpServer)

// Only these origins may call the API. Add any new deployed frontend/admin
// URL here (or replace with your own domain later) before removing localhost.
const allowedOrigins = [
    "https://doclyra.vercel.app",
    "https://doclyra-ipvc.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174"
]

// middlewares
app.use(express.json())
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (e.g. curl, mobile apps, server-to-server)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
}))

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

httpServer.listen(port, () => console.log(`Server started on PORT:${port}`))