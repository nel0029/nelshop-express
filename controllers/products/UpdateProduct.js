const asyncHandler = require('express-async-handler');
const { Products } = require('../../models/Products')

const updateProduct = asyncHandler(async (req, res) => {
    const { productID, productName, desc, category, image, variant, price } = req.body

    const productExists = await Products.findById(productID)

    if (productExists) {
        productName && (productExists.productName = productName)
        desc && (productExists.desc = desc)
        category && (productExists.category = category)
        image && (productExists.image = image)
        variant && (productExists.variant = variant)
        price && (productExists.price = price)

        await productExists.save()

        res.status(200).json(productExists)
    } else {
        res.status(404).json({ message: "Product not found" })
    }
})

module.exports = updateProduct