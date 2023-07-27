const express = require('express')
const router = express.Router()

const getAllProducts = require('../controllers/products/GetAllProducts')
const addNewProduct = require('../controllers/products/AddNewProduct')
const updateProduct = require('../controllers/products/UpdateProduct')
const deleteProduct = require('../controllers/products/DeleteProduct')
const getProductDetails = require('../controllers/products/GetProductDetails')

router.get('/all', getAllProducts)
router.post('/new', addNewProduct)
router.put('/update', updateProduct)
router.delete('/delete/:productID', deleteProduct)
router.get('/details/:productID', getProductDetails)


module.exports = router