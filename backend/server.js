import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';
import favicon from 'serve-favicon';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const allowedOrigins = [
    'https://mern-crud-vercel-eight.vercel.app', // Your frontend URL
    'http://localhost:3000' // For local development
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json()); // allows us to accept JSON data in the req.body

// Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Add a simple route to check if the server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Product routes
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

export default app;
