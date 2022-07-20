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
            author: '62d56377488572fae6411695',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Nothing for this homestay now',
            price,
            image: [
                    {
                      url: 'https://res.cloudinary.com/dwxvxsavp/image/upload/v1658307807/NiceHomestay/qecirqq9p63bzcyxcawn.jpg',
                      filename: 'NiceHomestay/qecirqq9p63bzcyxcawn'
                    },
                    {
                      url: 'https://res.cloudinary.com/dwxvxsavp/image/upload/v1658307808/NiceHomestay/uihonzfobyabyemubxfe.jpg',
                      filename: 'NiceHomestay/uihonzfobyabyemubxfe'
                    },
                    {
                      url: 'https://res.cloudinary.com/dwxvxsavp/image/upload/v1658307808/NiceHomestay/fwioph5ggazoxg7bywto.jpg',
                      filename: 'NiceHomestay/fwioph5ggazoxg7bywto'
                    },
                    {
                      url: 'https://res.cloudinary.com/dwxvxsavp/image/upload/v1658307809/NiceHomestay/smtopvu4nqw1qbsnj8hz.jpg',
                      filename: 'NiceHomestay/smtopvu4nqw1qbsnj8hz'
                    },
                    {
                      url: 'https://res.cloudinary.com/dwxvxsavp/image/upload/v1658307813/NiceHomestay/ekumpftxwpwhtgsqrsea.jpg',
                      filename: 'NiceHomestay/ekumpftxwpwhtgsqrsea'
                    },
                    {
                      url: 'https://res.cloudinary.com/dwxvxsavp/image/upload/v1658307812/NiceHomestay/w6m8m0l8f9bpt7yzt5ib.jpg',
                      filename: 'NiceHomestay/w6m8m0l8f9bpt7yzt5ib'
                    }
            ]
        })
        await homestay.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})