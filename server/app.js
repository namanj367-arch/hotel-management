const express = require("express")
const dotenv=require("dotenv")
dotenv.config()

const cors=require("cors")
const cookieParser=require("cookie-parser")
const fileUpload=require("express-fileupload")
const web = require("./routes/web")

const connectDB=require("./config/db")

//dotenv.config()

connectDB()

const app=express()
app.use(express.json())
app.use(cookieParser())

app.use(
    fileUpload({
        useTempFiles: true,
    })
)

app.use(
    cors({
        origin:"http://localhost:5173/",
        credentials: true,
    })
)


app.get("/", (req, res) => {
    res.send("Hotel Booking API is Running...");
});


const PORT = process.env.PORT || 5000;


app.use("/api",web)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});