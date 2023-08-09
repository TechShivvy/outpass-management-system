

const express = require("express")
// const data = require("./data/data")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routers/userRoutes")
const outpassRoutes = require("./routers/outpassRoutes")
const qrRoutes = require("./routers/qrRoutes")
const { notFound, errorHandler } = require("./middlewares/errorMiddleware") 
const cors= require("cors");

dotenv.config();
connectDB()
const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`server started on port ${PORT}`))

app.get("/",(req,res) => {
    res.redirect('/login');
})

app.use("/api/users",userRoutes);
app.use("/api/outpass", outpassRoutes);
app.use("/api/qr", qrRoutes);

// incase if invalid url or other error occurs 
// middlewares takes care of it 
app.use(notFound);
app.use(errorHandler)