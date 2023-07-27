const express = require('express')
const router = express.Router()

const getAllCartItems = require('../controllers/carts/GetAllCartItems')
const addNewCartItem = require('../controllers/carts/AddNewCartItems')
const updateCartItems = require('../controllers/carts/UpdateCartItems')
const deleteCartItems = require('../controllers/carts/DeleteCartItems')


router.get('/all', getAllCartItems)
router.post('/new', addNewCartItem)
router.put('/update', updateCartItems)
router.delete('/delete', deleteCartItems)

module.exports = router