import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", async (req, res) => {
  res.send("Server running successfully!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
