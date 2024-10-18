import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, {JWTPayload} from "jsonwebtoken";
import path from "path";

const JWT_SECRET = "SomeSecret";

const app = express;

app.use=(cookieParser());
app.use=(express.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));

app.post("/signin", (req:any, res:any)=>{
    const email = req.body.email;
    const password = req.body.password;

    const token = jwt.sign({
        id:1
    }, JWT_SECRET);
    res.cookie("token", token)
    res.send("Logged in");
})

app.get("/user", (req:any, res:any)=>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    //Get the user details from the database 
    res.send({
        userId: decoded.id
    })
})

app.post("logout", (req:any, res:any)=>{
    res.clearCookie("token");
    res.json({
        message:"Logged Out"
    })
})

app.listen(3000)
