const asyncHandler = require('express-async-handler');
const { Carts, CartItems } = require('../../models/Carts')
const { ObjectId } = require('mongodb');


const getAllCartItems = asyncHandler(async (req, res) => {
    const { cartID } = req.body

    const cartExists = await Carts.findById(cartID)

    if (cartExists) {
        const allCartItems = await CartItems.aggregate([
            {
                $match: {
                    cartID: new ObjectId(cartID)
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productID",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $lookup: {
                    from: "productdescriptions",
                    localField: "product.productCode",
                    foreignField: "_id",
                    as: "productDescription"
                }
            },
            {
                $project: {
                    productID: 1,
                    quantity: 1,
                    price: 1,
                    totalPrice: 1,
                    image: { $arrayElemAt: ["$product.image", 0] },
                    variant: { $arrayElemAt: ["$product.variant", 0] },
                    price: { $arrayElemAt: ["$product.price", 0] },
                    productName: { $arrayElemAt: ["$productDescription.productName", 0] },
                    desc: { $arrayElemAt: ["$productDescription.desc", 0] },
                    category: { $arrayElemAt: ["$productDescription.category", 0] },
                }
            }
        ])

        res.status(200).json(allCartItems)
    } else {
        res.status(404).json({ message: "Cart not found" })
    }
})

module.exports = getAllCartItems