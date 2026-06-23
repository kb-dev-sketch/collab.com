import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server runnig on port ${process.env.PORT}`);
    });
  })

  .catch((err) => {
    console.log("mongoDB connection failed", err);
    process.exit(1);
  });
