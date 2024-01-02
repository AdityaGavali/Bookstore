import express from "express";
const router = express.Router()
import {Book} from "../models/bookModel.js"
// roue to save books
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.review
    ) {
      res.status(400).json({ message: "send all the required field" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      review: req.body.review,
    };
    const book = await Book.create(newBook);
    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
//Route to get all all books from db
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(201).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
//Route to get one book by id from db
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//Route to update book
router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.review
    ) {
      return res.status(400).json({ message: "send all the required field" });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) return res.status(404).send({ message: "Book not found" });
    return res.status(200).send({ message: "book updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

// Route for delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) return res.status(404).send({ message: "Book not found" });
    return res.status(200).send({ message: "book deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

export default router ;