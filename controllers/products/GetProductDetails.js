const asyncHandler = require('express-async-handler');
const { Products } = require('../../models/Products')

const getProductDetails = asyncHandler(async (req, res) => {
    const { productID } = req.params

    const product = await Products.findById(productID)

    res.status(200).json(product)
})

module.exports = getProductDetails