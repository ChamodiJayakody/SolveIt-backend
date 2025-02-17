import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import bodyParser from 'body-parser';
import cors from 'cors';
import { google } from 'googleapis';
import axios from 'axios';
import ticketRoutes from "./routes/ticket.route.js";
import issueRoutes from "./routes/issue.route.js";

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


app.use(cors()); // Enable CORS
app.use(express.json());
app.use(cookieParser());

app.listen(3001, () => {
  console.log("Ticket Server is running on port 3001!");
});


app.use("/api/ticketService/", ticketRoutes);
app.use("/api/issueService/", issueRoutes);



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



