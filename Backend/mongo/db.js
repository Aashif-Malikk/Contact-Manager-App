const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL
console.log(MONGO_URL);

const connectDB = async () => {
    try {
        await mongoose.connect(`${MONGO_URL}/phoneApp`)
        console.log(`MongoDB connected successfully`)
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB