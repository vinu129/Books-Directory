import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import Books from "./../models/bookModel";

dotenv.config({ path: "./config.env" });
import app from "./../src/app";

// Ensure that DATABASE and DATABASE_PASSWORD are defined
if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  throw new Error(
    "DATABASE and DATABASE_PASSWORD must be defined in config.env"
  );
}

// Replace password in  config file with real password
const DB: string = process.env.DATABASE?.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Connect to MongoDB using Mongoose driver
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB successfully connected"));

/********************************************************************
         READ Json file - fill the database with the JSON data
********************************************************************/
const books = JSON.parse(fs.readFileSync("./data/books.json", "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Books.create(books);
    console.log("Data imported successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit(); // STOP APP AFTER IMPORTING ALL DATA
};

// DELETE ALL DATA  FROM DB
const deleteData = async () => {
  try {
    await Books.deleteMany();
    console.log("Data deleted successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit(); // STOP APP AFTER DELETE ALL DATA
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
