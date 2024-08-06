import Books from "../models/bookModel";
import APIFeatures from "../utilities/apiFeatures";

// GET REQUEST
export const getAllBooks = async (req: any, res: any) => {
  try {
    const features = new APIFeatures(Books.find(), req.query).filter().sort();

    // Get the count of records found after filter
    const totalSearchResults = await features.countDocuments();

    const paginatedResult = features.paginate();

    const books = await paginatedResult.query;

    if (req.query.search && req.query.search.trim() != " ") {
      const searchBooks = new APIFeatures(Books.find(), req.query)
        .search()
        .filter();

      // Get the count of records found in the search
      const totalSearchResults = await searchBooks.countDocuments();

      // Apply pagination to the search results
      const paginatedSearchBooks = searchBooks.paginate().sort();

      const searchResult = await paginatedSearchBooks.query;

      res.status(200).json({
        status: "success",
        results: totalSearchResults,
        data: { books: searchResult },
      });
    } else {
      res.status(200).json({
        status: "success",
        results: totalSearchResults,
        data: { books },
      });
    }
  } catch (err: any) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
// POST REQUEST
export const createBook = async (req: any, res: any) => {
  try {
    const newBook = await Books.create(req.body);
    res.status(201).json({
      status: "success",
      data: { books: newBook },
    });
  } catch (err: any) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// GET BY ID
export const getBook = async (req: any, res: any) => {
  try {
    const book = await Books.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: { book },
    });
  } catch (err: any) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// PATCH REQUEST
export const updateBook = async (req: any, res: any) => {
  try {
    const book = await Books.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (err: any) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// DELETE REQUEST
export const deleteBook = async (req: any, res: any) => {
  try {
    await Books.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const filterBooks = async (req: any, res: any) => {
  try {
    const status = await Books.aggregate([
      { $unwind: "$authors" }, // Unwind the authors array
      { $unwind: "$categories" }, // Unwind the categories array
      {
        $match: {
          authors: { $ne: "" || [""] },
          categories: { $ne: "" },
        },
      },

      {
        $group: {
          _id: null,
          status: { $addToSet: "$status" },
          authors: { $addToSet: "$authors" },
          categories: { $addToSet: "$categories" },
        },
      },
      {
        $project: {
          _id: 0, // Remove the _id field
          status: 1, // Keep the statuses array
          authors: 1,
          categories: 1,
        },
      },
      {
        $addFields: {
          authors: { $sortArray: { input: "$authors", sortBy: 1 } }, // sort authors array
          categories: { $sortArray: { input: "$categories", sortBy: 1 } }, // sort categories array
        },
      },
    ]);
    console.log(status);

    res.status(200).json({
      status: "success",
      data: status,
    });
  } catch (err: any) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
