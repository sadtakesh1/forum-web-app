import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import topicsRoutes from "./routes/topics.routes.js";
import sectionsRoutes from "./routes/sections.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.use("/auth", authRoutes);
app.use("/topics", topicsRoutes);

app.use("/sections", sectionsRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
