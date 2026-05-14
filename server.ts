import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Weather Data Proxy
  app.get("/api/weather", async (req, res) => {
    const { city, lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey || apiKey === "MY_OPENWEATHER_API_KEY") {
      // Return realistic mock data if API key is missing
      return res.json({
        mock: true,
        current: {
          temp: 22,
          description: "Partly Cloudy",
          humidity: 45,
          wind_speed: 12,
          aqi: 28,
          uv: 4,
          icon: "02d",
          location: city || "Neo-Tokyo",
        },
        forecast: Array.from({ length: 7 }, (_, i) => ({
          day: new Date(Date.now() + i * 86400000).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          temp_max: 24 + Math.round(Math.random() * 5),
          temp_min: 18 + Math.round(Math.random() * 5),
          description: i % 2 === 0 ? "Clear" : "Cloudy",
        })),
        alerts: [
          {
            event: "Futuristic Storm Surge",
            description: "An ion storm is approaching the Neo-Tokyo district. Expected high power fluctuations.",
          },
        ],
      });
    }

    try {
      // In a real app, you'd call OpenWeatherMap here.
      // For this demo, let's keep the mock data robust but allow for future integration.
      // I'll implement a basic fetch helper if you decide to add a real one.
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city || "London"}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  // Vite middleware for development
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
    console.log(`WeatherX Server running on http://localhost:${PORT}`);
  });
}

startServer();
