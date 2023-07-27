const asyncHandler = require('express-async-handler');
const { Users } = require('../../models/Users')
const { Carts } = require('../../models/Carts')
const generateToken = require('./services/GenerateToken')
const bcrypt = require('bcryptjs')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, contactNumber, role } = req.body

    const userExists = await Users.findOne({ email })

    if (!userExists) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const profilePicture = {
            name: process.env.USER_DEFAULT_PROFILE_PICTURE_NAME,
            url: process.env.USER_DEFAULT_PROFILE_PICTURE_URL
        }

        const newUser = await Users.create({
            name,
            email,
            contactNumber,
            profilePicture,
            role,
            password: hashedPassword
        })

        if (newUser) {
            const newCart = await Carts.create({
                ownerID: newUser._id
            })

            if (newCart) {
                res.status(201).json({
                    userID: newUser._id,
                    name,
                    email,
                    profilePicture,
                    contactNumber,
                    cartID: newCart._id,
                    token: generateToken(newUser._id)
                })
            }


        } else {
            res.status(400).json({ message: "Invalid User Data" })
        }

    } else {
        res.status(400).json({ message: "User with this email is already registered" })
    }
})

module.exports = registerUser