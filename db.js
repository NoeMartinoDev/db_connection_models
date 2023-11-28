const { Sequelize } = require("sequelize")
require("dotenv").config()
const { USER, PASSWORD, HOST, PORT, DB_NAME } = process.env

const PatientModel = require("./models/Patient")
const DoctorModel = require("./models/Doctor")

const database = new Sequelize (
    `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`,
    { logging: false }
)

PatientModel(database)
DoctorModel(database)

const { Patient, Doctor } = database.models

Patient.belongsToMany(Doctor, { through: "PatientDoctor" })
Doctor.belongsToMany(Patient, { through: "PatientDoctor" })

module.exports = {
    database
}