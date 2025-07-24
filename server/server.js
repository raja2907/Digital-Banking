const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req, res) => res.send('API running...'));

app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));
