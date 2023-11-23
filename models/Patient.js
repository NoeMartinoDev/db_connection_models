const { DataTypes } = require("sequelize")

module.exports = (database) => {
    database.define("Patient", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM("Male", "Female", "X")
    },
    email: {
        type: DataTypes.STRING,
        isEmail: true
    },
    birth: {
        type: DataTypes.DATE,
        allowNull: false
    }
})
}