const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground')


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          // MY USER ID
            author: '6669a866f6a2ece43e2cbdac',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptatum incidunt iusto libero nulla omnis minus velit, exercitationem asperiores tempore enim rem harum odit in necessitatibus quibusdam aliquid consequuntur provident.',
            price,
            geometry: {
              type: 'Point',
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dbs5chysi/image/upload/v1718441945/YelpCamp/ovxesn0zr9g9ijkp14qz.jpg',
                  filename: 'YelpCamp/ovxesn0zr9g9ijkp14qz'
                },
                {
                  url: 'https://res.cloudinary.com/dbs5chysi/image/upload/v1718441945/YelpCamp/wd5lav0fcllrpblwefae.jpg',
                  filename: 'YelpCamp/wd5lav0fcllrpblwefae'                
                }
              ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})


