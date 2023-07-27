const asyncHandler = require('express-async-handler');
const { InventoryItems } = require('../../models/Inventory');

const updateInventoryItem = asyncHandler(async (req, res) => {
    const { inventoryItemID, newQuantity, quantity } = req.body;

    const inventoryItemExists = await InventoryItems.findById(inventoryItemID);

    if (inventoryItemExists) {
        if (quantity) {
            const updatedItem = await InventoryItems.findByIdAndUpdate(
                inventoryItemID,
                { $inc: { quantity: quantity } },
                { new: true }
            );

            console.log(updatedItem);
            res.status(200).json(updatedItem);
        }

        if (newQuantity) {
            inventoryItemExists.quantity = newQuantity
            await inventoryItemExists.save()

            res.status(200).json(inventoryItemExists)
        }
    } else {
        res.status(404).json({ message: "Inventory Not Found" });
    }
});

module.exports = updateInventoryItem;
