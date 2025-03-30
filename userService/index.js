import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import bodyParser from 'body-parser';
import cors from 'cors';
import { google } from 'googleapis';
import axios from 'axios';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();



const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3002'],  // Replace with your frontend's URL
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("User Server is running on port 3000!");
});



app.use("/api/userService/user", userRoutes);
app.use("/api/userService/auth", authRoutes);




app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, "../refaa-client/dist")));




app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../refaa-client/dist/index.html"));
// });



