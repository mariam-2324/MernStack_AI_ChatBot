import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from "express";
import { DatabaseConnection } from './db_Connect/db_config.js'
import userRouter from './Routes/userRoute.js'
// import botRouter from './Routes/botRoute.js'

const app = express();

app.use(express.json());
app.use(cors());

DatabaseConnection();


app.get("/", (req, res) => {
    res.send("Server is running successfully!");
});

// app.use("/botRoute", botRouter);
app.use("/userRoute", userRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});