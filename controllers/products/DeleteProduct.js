const asyncHandler = require('express-async-handler');
const { Products } = require('../../models/Products')
const { InventoryItems } = require('../../models/Inventory')

const deleteProduct = asyncHandler(async (req, res) => {
    const { productID } = req.params

    const productExists = await Products.findById(productID)

    if (productExists) {
        const deletedProduct = await Products.findOneAndDelete({ _id: productExists._id })
        await InventoryItems.findOneAndDelete({ productID: deletedProduct._id })

        res.status(200).json(deletedProduct)
    } else {
        res.status(404).json({ message: "Product Not Found" })
    }
})

module.exports = deleteProduct