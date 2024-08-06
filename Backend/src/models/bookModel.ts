import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
    default: 0,
  },
  publishedDate: { type: String },
  thumbnailUrl: { type: String },
  shortDescription: { type: String },
  longDescription: { type: String },
  status: { type: String },
  authors: [String],
  categories: [String],
  isFavorite: { type: Boolean },
});

const Books = mongoose.model("Books", booksSchema);

export default Books;
