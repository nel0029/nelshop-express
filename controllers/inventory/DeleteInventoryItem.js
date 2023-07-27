const asyncHandler = require('express-async-handler');
const { InventoryItems } = require('../../models/Inventory')


const deleteInventoryItem = asyncHandler(async (req, res) => {
    const { inventoryItemID } = req.body

    const inventoryItemExists = await InventoryItems.findById(inventoryItemID)

    if (inventoryItemExists) {
        const deletedInventoryItem = await InventoryItems.findByIdAndDelete(inventoryItemExists._id)

        res.status(200).json(deletedInventoryItem)
    } else {
        res.status(404).json({ message: "Inventory Not Found" })
    }
})

module.exports = deleteInventoryItem