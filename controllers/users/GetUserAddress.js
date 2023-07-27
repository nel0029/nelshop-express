const asyncHandler = require('express-async-handler');
const { Users, UserAddress } = require('../../models/Users')


const getUserAddress = asyncHandler(async (req, res) => {
    const { userID } = req.params

    const userExists = await Users.findById(userID)

    if (userExists) {
        const userAddress = await UserAddress.findOne({ ownerID: userExists._id })

        res.status(200).json(userAddress)
    } else {
        res.status(404).json({ message: "User not found" })
    }
})

module.exports = getUserAddress