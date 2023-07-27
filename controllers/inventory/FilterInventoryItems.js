const asyncHandler = require('express-async-handler');
const { InventoryItems } = require('../../models/Inventory');
const { ObjectId } = require("mongodb");

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const filterInventoryItems = asyncHandler(async (req, res) => {
    const { keyword } = req.query;

    if (keyword) {
        const escapedKeyword = escapeRegExp(keyword.toString());

        const inventoryItems = await InventoryItems.aggregate([
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
                $addFields: {
                    productName: "$product.productName",
                    category: "$product.category",
                    price: "$product.price",
                    desc: "$product.desc",
                    image: "$product.image"
                }
            },
            {
                $match: {
                    $or: [
                        { _id: { $regex: escapedKeyword, $options: "i" } },
                        { productID: { $regex: escapedKeyword, $options: "i" } },
                        { productName: { $regex: escapedKeyword, $options: "i" } },
                        { category: { $regex: escapedKeyword, $options: "i" } },
                        { desc: { $regex: escapedKeyword, $options: "i" } }
                    ]
                }
            },
            {
                $project: {
                    productName: 1,
                    category: 1,
                    price: 1,
                    desc: 1,
                    image: 1,
                    _id: 1,
                    _id: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    quantity: 1,
                    productID: 1,
                }
            }
        ])

        res.status(200).json(inventoryItems);
    }
});

module.exports = filterInventoryItems;
