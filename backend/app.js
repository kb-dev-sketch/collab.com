import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// routers import
import { router } from "./src/routes/authRouter.js";
import { errorHandler } from "./src/middleware/error.middleware.js";

app.get("/", (req, res) => {
  res.send("Server Working");
});
app.use("/api/v1/users", router);

export { app };
app.use(errorHandler);
