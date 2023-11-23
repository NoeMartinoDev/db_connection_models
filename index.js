const express = require("express")
const server = express()
const { database } = require("./db")

server.use(express.json())

database.sync({ force: true }).then(() => {
    console.log("DB connected")
    server.listen(3001, () => {
        console.log("Listening on port 3001")
    })
})
