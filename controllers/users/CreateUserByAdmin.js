const asyncHandler = require('express-async-handler');
const { Users } = require('../../models/Users')
const { Carts } = require('../../models/Carts')
const generateToken = require('./services/GenerateToken')
const bcrypt = require('bcryptjs')

const createUserByAdmin = asyncHandler(async (req, res) => {
    const { name, email, contactNumber, profilePicture } = req.body

    const password = process.env.USER_DEFAULT_PASSWORD

    const userExists = await Users.findOne({ email })

    if (!userExists) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await Users.create({
            name,
            email,
            contactNumber,
            role: "user",
            profilePicture,
            password: hashedPassword
        })

        if (newUser) {
            const newCart = await Carts.create({
                ownerID: newUser._id
            })


            res.status(201).json({
                name,
                email,
                profilePicture,
                cartID: newCart._id,
                token: generateToken(newUser._id)
            })
        } else {
            res.status(400).json({ message: "Invalid User Data" })
        }

    } else {
        res.status(400).json({ message: "User with this email is already registered" })
    }
})

module.exports = createUserByAdmin