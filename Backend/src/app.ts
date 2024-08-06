import express from "express";
import bookRouter from "./routes/bookRoutes";
import morgan from "morgan";
import router from "./routes/bookRoutes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*", // allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add other headers if necessary
  })
);

// 1.Middleware to modify the incoming data
app.use(express.json());

// If environment is development then only do this
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// ROUTES
app.use("/api/v1/books", router);

// SERVER
export default app;
