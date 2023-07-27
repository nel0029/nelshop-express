const asyncHandler = require('express-async-handler');
const { Users } = require('../models/Users');


const adminValidator = asyncHandler(async (req, res, next) => {
    const { userID } = req.query

    const userExists = await Users.findById(userID)

    if (userExists.role === "admin") {
        res.status(200).json({ message: "Authorized" })
        next()
    } else {
        res.status(405).json({ message: "You are not authorized" })
    }
})

module.exports = adminValidator