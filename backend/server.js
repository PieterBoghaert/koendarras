import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.js";
const app = express();
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(cors()); // allow cross-origin requests
app.use(express.json()); // parse JSON bodies

// Mount contact route at /api/contact
app.use("/api/contact", contactRoutes);

app.listen(3000, () => {
  console.log("✅ Server running on https://koendarras.com");
});
