const asyncHandler = require('express-async-handler');
const { Users } = require('../../models/Users')

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await Users.find()
    res.status(200).json(users)
})

module.exports = getAllUsers