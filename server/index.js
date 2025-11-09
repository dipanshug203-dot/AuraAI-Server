import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// health check
app.get("/", (req, res) => res.send("✅ AURA server running"));

// chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages) return res.status(400).json({ error: "Missing messages" });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      max_tokens: 600
    });
    
    const reply = completion.choices?.[0]?.message?.content || "No response";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
