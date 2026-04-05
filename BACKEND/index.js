require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./db');
const routers = require('./routers/routers');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use((req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
//     // Log the body, but safely obscure the password if it exists
//     if (Object.keys(req.body).length) {
//         const safeBody = { ...req.body };
//         if (safeBody.password) safeBody.password = '***';
//         console.log('Request Body:', safeBody);
//     }
//     next();
// });

connectDB();

app.use('/api', routers);

app.get('/', (req, res) => {
    res.send('Banking API is running');
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
