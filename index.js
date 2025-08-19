import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import cors from "cors";
import session from "express-session";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/Kambaz";
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      const allowed = [
        "http://localhost:5173",
        "http://localhost:4000"
      ];
      if (
        !origin ||
        allowed.includes(origin) ||
        /\.netlify\.app$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin: " + origin));
      }
    },
  })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "Kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
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
app.listen(process.env.PORT || 4000)
console.log(CONNECTION_STRING);