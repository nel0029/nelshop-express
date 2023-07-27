const asyncHandler = require('express-async-handler');
const { Users, UserAddress } = require('../../models/Users')
const { Carts, CartItems } = require('../../models/Carts')

const deleteUser = asyncHandler(async (req, res) => {
    const { userID } = req.params

    const userExists = await Users.findById(userID)

    if (userExists) {
        const deletedUser = await Users.findByIdAndDelete(userExists._id)
        if (deletedUser) {
            const cartExists = await Carts.findOneAndDelete({ ownerID: deletedUser._id })
            await UserAddress.findOneAndDelete({ ownerID: deletedUser._id })

            if (cartExists) {
                await CartItems.deleteMany({ cartID: cartExists._id })
                res.status(200).json(deletedUser)
            }

        }

    } else {
        res.status(404).json({ message: "User not found" })
    }
})

module.exports = deleteUser