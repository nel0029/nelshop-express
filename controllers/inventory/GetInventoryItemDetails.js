const asyncHandler = require('express-async-handler');
const { InventoryItems } = require('../../models/Inventory')
const { ObjectId } = require("mongodb")

const getInventoryDetails = asyncHandler(async (req, res) => {
    const { inventoryID } = req.params

    const inventoryItems = await InventoryItems.aggregate([
        {
            $match: {
                _id: new ObjectId(inventoryID)
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
    const inventoryItemDetails = inventoryItems[0]
    res.status(200).json(inventoryItemDetails)
})

module.exports = getInventoryDetails