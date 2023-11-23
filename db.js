const { Sequelize } = require("sequelize")
require("dotenv").config()
const { USER, PASSWORD, HOST, PORT, DB_NAME } = process.env

const PatientModel = require("./models/Patient")

const database = new Sequelize (
    `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`
)

PatientModel(database)

module.exports = {
    database
}