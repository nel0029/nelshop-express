const asyncHandler = require('express-async-handler');
const { Users } = require('../../models/Users')
const generateToken = require('./services/GenerateToken')
const bcrypt = require('bcryptjs')


const updateUser = asyncHandler(async (req, res) => {
    const { userID, name, contactNumber, email, password, profilePicture } = req.body


    const userExists = await Users.findById(userID)

    if (userExists) {

        if (name) {
            userExists.name = name
        }

        if (contactNumber) {
            userExists.contactNumber = contactNumber
        }

        if (email) {
            userExists.email = email
        }

        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            userExists.password = hashedPassword
        }

        if (profilePicture) {
            userExists.profilePicture = profilePicture
        }

        await userExists.save()

        const updatedUser = await Users.findById(userExists._id)

        res.status(200).json(updatedUser)
    }
})

module.exports = updateUser