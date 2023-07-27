const asyncHandler = require('express-async-handler');
const { Carts, CartItems } = require('../../models/Carts')


const deleteCartItems = asyncHandler(async (req, res) => {
    const { cartID, cartItemID } = req.body

    const cartExists = await Carts.findById(cartID)

    if (cartExists) {
        const deletedCartItem = await CartItems.findByIdAndDelete(cartItemID)

        res.status(200).json(deletedCartItem)
    } else {
        res.status(404).json({ message: "Cart Not found" })
    }
})

module.exports = deleteCartItems