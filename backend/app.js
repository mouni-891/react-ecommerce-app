import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";       
import passport from "passport";              
import "./src/config/passport.js";            
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/productRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config({ path: "../.env" });;
connectDB();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,                          
}));
app.use(express.json());

app.use(session({                            
  secret: process.env.JWT_SECRET || "secret123",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());              

app.use("/images", express.static("public/images"));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));