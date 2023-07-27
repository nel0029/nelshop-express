const asyncHandler = require('express-async-handler');
const { Carts, CartItems } = require('../../models/Carts')
const { Products } = require('../../models/Products')


const addNewCartItem = asyncHandler(async (req, res) => {
    const { cartID, productID, quantity } = req.body

    const cartExists = await Carts.findById(cartID)

    if (cartExists) {
        const productExists = await Products.findById(productID)

        if (productExists) {

            const newCartItem = await CartItems.create({
                cartID: cartExists._id,
                productID: productExists._id,
                quantity: quantity,
                totalPrice: productExists.price * quantity
            })

            res.status(200).json(newCartItem)

        } else {
            res.status(404).json({ message: "Product Not Found" })
        }
    } else {
        res.status(404).json({ message: "Cart not found" })
    }
})

module.exports = addNewCartItem