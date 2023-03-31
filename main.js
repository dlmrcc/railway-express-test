// here we get codes from 3rd party plugins/library

const dotenv = require('dotenv');
dotenv.config(); // load environment variables from .env file

// here we get codes from 3rd party plugins/library


const express = require('express') // server code or to run our own server on localhost specified by port
const cors = require('cors') // this allows us to access our server on a different domain
const bodyParser = require("body-parser"); // this allows us to ready request data JSON object
const app = express() // initialize express server into a variable
const fs = require('fs') // use file system of windows or other OS to access local files
const request = require('request');
const requestAPI = request;


const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'containers-us-west-58.railway.app',
    port: '5721',
    database: 'railway',
    username: 'root',
    password: 'yJEj8pjd496sPuvgCFwK',
});

console.log(process.env.DB_HOST)
const Users = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'users',
    timestamps: false,
});


let rawData = fs.readFileSync('data.json'); // read file from given path
let parsedData = JSON.parse(rawData); // parse rawData (which is a string into a JSON object)

app.use(cors()) // initialize cors plugin on express
app.use(bodyParser.urlencoded({ // initialize body parser plugin on express
    extended: true
}));
app.use(bodyParser.json());// initialize body parser plugin on express

let defaultData = [];




app.post('/api/save', function (request, response) {

    let retVal = { success: false };
    console.log('req: ', request.body)
    Users.create({
        name: request.body.name,
    })
        .then((result) => {
            retVal = { success: true }
            return result.dataValues;
        })
        .finally(() => {
            response.send(retVal)
        })
        .catch((error) => {
            console.log('error: ', error)
        })
})



const runApp = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(3011) // run app with this given port
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
runApp()