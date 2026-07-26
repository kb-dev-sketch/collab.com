import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import { app } from "./app.js";
import http from "http";
import { initSocket } from "./src/sockets/socket.js";
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
const server = http.createServer(app);

initSocket(server);

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on ${process.env.PORT || 8000}`);
});
