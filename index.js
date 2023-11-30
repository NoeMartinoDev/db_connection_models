const express = require("express")
const server = express()
const { database } = require("./db")
const { Patient } = require("./db")
const { Doctor } = require("./db")

server.use(express.json())

server.delete("/patient/:id", async (req, res) => {
    const { id } = req.params

    try {
        const patientDeleted = await Patient.findByPk(id)
        await patientDeleted.destroy()
        res.status(200).send("Patient deleted")
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

server.get("/patient", async (req, res) => {
    try {
        const patients = await Patient.findAll({
            include: {
                model: Doctor,
                attributes: ["name", "speciality"],
                through: {
                    attributes: []
                }
            }
        })
        res.status(200).json(patients)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

server.post("/patient", async (req, res) => {
    const { name, gender, email, birth, doctors } = req.body

    try {
        const newPatient = await Patient.create({ name, gender, email, birth })
        newPatient.addDoctor(doctors)
        res.status(200).json(newPatient)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

server.get("/doctor/:id", async (req, res) => {
    const { id } = req.params

    try {
        const doctor = await Doctor.findByPk(id)
        res.status(200).json(doctor)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

server.get("/doctor", async (req, res) => {
    try {
        const doctors = await Doctor.findAll()
        res.status(200).json(doctors)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

server.post("/doctor", async (req, res) => {
    const { name, speciality } = req.body

    try {
        const newdoctor = await Doctor.create({ name, speciality })
        res.status(200).json(newdoctor)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

database.sync({ force: false }).then(() => {
    console.log("DB connected")
    server.listen(3001, () => {
        console.log("Listening on port 3001")
    })
})
