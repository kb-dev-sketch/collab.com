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
import { authRouter } from "./src/routes/auth.routes.js";
import { creatorRouter } from "./src/routes/creator.routes.js";
import { brandRouter } from "./src/routes/brand.routes.js";
import { campaignRouter } from "./src/routes/campaign.routes.js";
import { errorHandler } from "./src/middleware/error.middleware.js";
import { proposalRoute } from "./src/routes/proposal.routes.js";
import { chatRouter } from "./src/routes/chat.routes.js";
import { notificationRouter } from "./src/routes/notification.routes.js";

app.get("/", (req, res) => {
  res.send("Server Working");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/creators", creatorRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/campaigns", campaignRouter);
app.use("/api/v1/proposals", proposalRoute);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/notification", notificationRouter);
app.use(errorHandler);

export { app };
