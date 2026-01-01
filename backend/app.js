import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import adminRouter from "./src/routes/admin.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["POST", "GET", "DELETE", "PATCH"],
    httpOnly: true,
    credentials: true,
  })
);

app.use(
  session({
    name: "erp-session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 2,
    },
  })
);

app.use("/api/v2/admin", adminRouter);

import mapRouter from "./src/routes/mapping.route.js";
app.use("/api/v2/map", mapRouter);

import courseRouter from "./src/routes/course.route.js";
app.use("/api/v2/course", courseRouter);

export { app };
