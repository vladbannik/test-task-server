const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { request, response } = require("express");
const Colors = require("./models/Colors");
const User = require("./models/User");
const cors = require('cors');

dotenv.config();

app.use(cors({
    origin: '*'
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
        app.listen(8080, () => console.log(`Database is connected. Server started on http://localhost:8080`));
    },
);

app.post('/color', async (request, response) => {
    const { color } = request.body;
    await Colors.create({ color })
        .then(() => {
            response.status(200).send("Added")
        })
        .catch(() => { response.status(500).send('Something went wrong') })
})

app.get('/color', async (request, response) => {

    await Colors.find({})
        .then((data) => {
            const result = Array.from(data, d => d.color)
            response.status(200).json({ colors: result })
        })
        .catch(() => { response.status(500).send('Something went wrong') })
})

app.post('/', async (request, response) => {
    const { user, color } = request.body;
    await User.create({ user, color })
        .then(() => {
            response.status(200).send("Added")
        })
        .catch(() => { response.status(500).send('Something went wrong') })
})

