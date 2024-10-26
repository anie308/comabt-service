import express from "express";
require("dotenv").config();
import cors, { CorsOptions } from "cors";
import http from "http";
import morgan from "morgan";
import bot from "./bot";

const app = express();
const port = process.env.PORT || 8000;

// app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan("dev"));

const allowedOrigins = [
    "http://localhost:3002",
    "https://jungle-ticket-fe.vercel.app",
    // Add more allowed origins as needed
  ];
  
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin || "") || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS", // Allow preflight requests (OPTIONS)
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials like cookies or Authorization headers
  };
  
  // Enable CORS with the specified options
  app.use(cors(corsOptions));
  
  // Ensure OPTIONS requests are handled
  app.options("*", cors(corsOptions));


  app.listen(port, () => {
    bot.launch();
    console.log(`===SERVER READY ON PORT ${port}===`);
  });