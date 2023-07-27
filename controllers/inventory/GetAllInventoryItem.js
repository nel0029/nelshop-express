const asyncHandler = require('express-async-handler');
const { InventoryItems } = require('../../models/Inventory')

const getAllInventoryItems = asyncHandler(async (req, res) => {
    const allInventoryItems = await InventoryItems.aggregate([
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
            $project: {
                _id: 1,
                productID: 1,
                quantity: 1,
                productName: "$product.productName",
                desc: "$product.desc",
                category: "$product.category",
                image: "$product.image",
                price: "$product.price",
            }
        }
    ])

    res.status(200).json(allInventoryItems)
})

module.exports = getAllInventoryItems