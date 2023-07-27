const asyncHandler = require('express-async-handler');
const { InventoryItems } = require('../../models/Inventory')


const addNewInventoryItem = asyncHandler(async (req, res) => {
    const { productID, quatity } = req.body
    const newInventoryItem = await InventoryItems.create({
        productID,
        quatity
    })

    res.status(200).json(newInventoryItem)
})

module.exports = addNewInventoryItem