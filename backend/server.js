require('dotenv').config();
const app = require('./src/config/app');
const connectDB = require('./src/config/db');

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server is running in http://localhost:${PORT}`);
})