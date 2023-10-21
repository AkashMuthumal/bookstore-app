import express, { request, response } from "express";
import { POST, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRouter from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type"],
    })
);

// Middleware for handling books route
app.use("/books", booksRouter);

// database connection
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to databse");

        // start server on port
        app.listen(POST, () => {
            console.log(`app is listening on port ${POST}`);
        });
    })

    .catch((error) => {
        console.log(error);
    });
