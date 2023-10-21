import mongoose from "mongoose";
import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for Save a new Book
router.post("/", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: `Send all required fields: title, author, publishYear`,
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for get all Books
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(201).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for get a book by id
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid book id`,
            });
        }

        const book = await Book.findById(id).exec();
        return response.status(201).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for update a book
router.put("/:id", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: `Send all required fields: title, author, publishYear`,
            });
        }

        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid book id`,
            });
        }

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({
                message: `Book not found`,
            });
        }

        return response.status(200).send({
            message: `Book successfully updated!`,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete a book
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid book id`,
            });
        }

        const result = await Book.findByIdAndRemove(id);

        if (!result) {
            return response.status(404).send({
                message: `Book not found`,
            });
        }

        return response.status(200).send({
            message: `Book successfully deleted!`,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
