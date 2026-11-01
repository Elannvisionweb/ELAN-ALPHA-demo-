const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors({
    origin: 'elan.org.in',
    credentials: true,
}));

// Routes
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on backend.elan.org.in`);
});
