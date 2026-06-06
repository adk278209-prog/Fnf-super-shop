import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        config: {
          tools: [{ googleSearch: {} }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: "You are a customer service assistant for a premium global supermarket. Respond strictly in professional, fluent English. Keep it investor-ready. Act as a Smart Basket Builder: if the user asks about a dish or theme, output a structured list of ingredients (with dynamic dollar pricing based on shipping location logic: $1.50 local / $15.00 global, with proper USD/EUR/GBP/BDT currency markers) and a clear 'Add Bundle to Cart' simulation response. Implement Real-Time Google Image Grounding Protocol: anytime you output a product, provide a highly accurate, real-time live official product image URL sourced from a CDN or trusted e-commerce domain ending in .jpg/.png. Never use generic placeholders or local assets. Always include structure with id, name, category, sub_category, price, and image." }]
          },
          {
            role: "user",
            parts: [{ text: message }]
          }
        ]
      });
      
      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to generate reply" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
