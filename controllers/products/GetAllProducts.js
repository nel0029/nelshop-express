const asyncHandler = require('express-async-handler');
const { Products } = require('../../models/Products')

const getAllProducts = asyncHandler(async (req, res) => {
    const allProducts = await Products.find()

    res.status(200).json(allProducts)
})

module.exports = getAllProducts