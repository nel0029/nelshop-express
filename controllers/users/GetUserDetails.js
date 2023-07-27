const asyncHandler = require('express-async-handler');
const { Users } = require('../../models/Users')

const getUserDetails = asyncHandler(async (req, res) => {
    const { userID } = req.params

    const user = await Users.findById(userID, { _id: 1, name: 1, contactNumber: 1, email: 1, profilePicture: 1, createdAt: 1, updatedAt: 1 })

    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: "User Not Found" })
    }
})

module.exports = getUserDetails