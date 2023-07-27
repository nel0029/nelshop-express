const asyncHandler = require('express-async-handler');
const { Users } = require('../../models/Users')
const generateToken = require('./services/GenerateToken')
const bcrypt = require('bcryptjs')


const updateAccount = asyncHandler(async (req, res) => {
    const { userID, name, contactNumber, email, password, newPassword, profilePicture } = req.body


    const userExists = await Users.findById(userID)

    if (userExists && (await bcrypt.compare(password, userExists.password))) {

        if (name) {
            userExists.name = name
        }

        if (contactNumber) {
            userExists.contactNumber = contactNumber
        }

        if (email) {
            userExists.email = email
        }

        if (newPassword) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword, salt)

            userExists.password = hashedPassword
        }

        if (profilePicture) {
            userExists.profilePicture = profilePicture
        }

        await userExists.save()

        const updatedUser = await Users.findById(userExists._id, { _id: 1, name: 1, contactNumber: 1, email: 1, profilePicture: 1, createdAt: 1, updatedAt: 1 })


        res.status(200).json(updatedUser)
    } else {

        res.status(401).json({ message: "Wrong Password" })
    }
})

module.exports = updateAccount