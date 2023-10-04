const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
require('./connectDb');

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`blog server running on port ${PORT}`);
})