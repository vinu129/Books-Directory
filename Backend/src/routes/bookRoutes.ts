import express from "express";
import {
  createBook,
  deleteBook,
  filterBooks,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/bookController";
// import { getAllBooks, createBook } from "./../controllers/bookController";

const router = express.Router();

router.route("/filter").get(filterBooks);
router.route("/").get(getAllBooks).post(createBook);
router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

export default router;
