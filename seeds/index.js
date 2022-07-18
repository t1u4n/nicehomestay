const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Homestay = require('../models/homestay');

mongoose.connect('mongodb://localhost:27017/great-homestay')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connection");
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Homestay.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const homestay = new Homestay({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/2403558',
            description: 'Nothing for this homestay now',
            price
        })
        await homestay.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})