const asyncHandler = require('express-async-handler');
const { Products } = require('../../models/Products')
const { InventoryItems } = require('../../models/Inventory')

const addNewProduct = asyncHandler(async (req, res) => {
    const { productName, category, desc, image, variants, price } = req.body

    const newProduct = await Products.create({
        productName,
        category,
        desc,
        image,
        variants,
        price
    })

    if (newProduct) {
        await InventoryItems.create({
            productID: newProduct._id,
            quantity: 0
        })
    }

    res.status(200).json(newProduct)
})

module.exports = addNewProduct