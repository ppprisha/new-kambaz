import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING ||
  "mongodb+srv://prish:R5UszwQZmALNlRu8@cluster0.xtyvvkt.mongodb.net/kambaz?retryWrites=true&w=majority&tls=true";

mongoose
  .connect(CONNECTION_STRING)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();

const allowedOrigins = [
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "https://final--tiny-daifuku-0565f9.netlify.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || /\.netlify\.app$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin: " + origin));
      }
    },
    credentials: true, // allow cookies
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "Kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // defaults for development
    secure: false,
    sameSite: "lax",
  },
};

if (process.env.NODE_ENV === "production") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    secure: true, // HTTPS only
    sameSite: "none", // allow cross-site cookies
    domain: ".onrender.com", // adjust to your backend domain
  };
}

app.use(session(sessionOptions));

app.use(express.json());

UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
