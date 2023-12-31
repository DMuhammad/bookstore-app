import express from "express";
import { Book } from "../models/BookModel.js";

const bookRouter = express.Router();

bookRouter.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res
        .status(401)
        .send({ message: "Send all fields: title, author, publishYear" });
    }

    const newBook = {
      title,
      author,
      publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

bookRouter.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

bookRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

bookRouter.put("/:id", async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(401)
        .send({ message: "Send all fields: title, author, publishYear" });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(201).send({ message: "Book updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

bookRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

export default bookRouter;
