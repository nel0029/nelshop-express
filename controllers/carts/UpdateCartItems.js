const asyncHandler = require('express-async-handler');
const { Carts, CartItems } = require('../../models/Carts')


const updateCartItems = asyncHandler(async (req, res) => {
    const { cartID, cartItemID, quantity } = req.body

    const cartExists = await Carts.findById(cartID)
    if (cartExists) {
        const cartItemExists = await CartItems.findById(cartItemID)

        if (cartItemExists) {
            cartItemExists.quantity = quantity
            cartItemExists.totalPrice = cartItemExists.totalPrice * quantity

            await cartItemExists.save()
        } else {
            res.status(404).json({ message: "Cart Item not found" })
        }
    } else {
        res.status(404).json({ message: "Cart not found" })
    }
})

module.exports = updateCartItems