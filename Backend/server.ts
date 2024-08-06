import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./src/app";
dotenv.config({ path: "./config.env" });

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
    useFindAndModify: true,
  })
  .then(() => console.log("DB successfully connected"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
