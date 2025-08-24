const express = require("express");
const app = express();


const dotenv = require("dotenv");
dotenv.config();

// const cors = require("cors");
// app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Import routes/index.js
const routes = require("./routers");
app.use(routes);

// supaya bisa baca JSON dari body request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`App is runnning on port ${port}`);
});