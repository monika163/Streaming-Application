//step-1
// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import path from "path";

databaseConnection();

dotenv.config({
  path: ".env"
});

const __dirname = path.resolve();

const app = express();
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors()); // CORS call

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));

// api
app.use("/api/v1/user", userRoute);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (req, resp) {
  resp.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server listen at port ${process.env.PORT}`);
});
