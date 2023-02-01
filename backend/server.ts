import path from "path";
import express from "express";
import connectDB from "./db/connectDb";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import productRoutes from "./routes/productRoutes";
import { userRouter } from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (_, res) =>
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (_, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1); // TODO: search why this is needed
  });
