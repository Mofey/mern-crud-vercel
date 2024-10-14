import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';
import favicon from 'serve-favicon';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

// Enable CORS
app.use(cors({
    origin: 'https://your-frontend-domain.vercel.app', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // if you need to handle cookies or authentication
}));

// Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Add a simple route to check if the server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use("/products", productRoutes);

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
