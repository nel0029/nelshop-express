const asyncHandler = require('express-async-handler');
const { Users } = require('../../models/Users')
const { Carts } = require('../../models/Carts')
const generateToken = require('./services/GenerateToken')
const bcrypt = require('bcryptjs')

const logInUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const userExists = await Users.findOne({ email: email })

    if (userExists && (await bcrypt.compare(password, userExists.password))) {
        const cartExists = await Carts.findOne({ ownerID: userExists._id })
        if (cartExists) {
            res.status(200).json({
                userID: userExists._id,
                name: userExists.name,
                email: userExists.email,
                profilePicture: userExists.profilePicture,
                token: generateToken(userExists._id),
                cartID: cartExists._id
            })
        }
    } else {
        res.status(400).json({ message: "Invalid Email or Password" })
    }
})

module.exports = logInUser