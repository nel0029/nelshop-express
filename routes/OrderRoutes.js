const express = require('express')
const router = express.Router()


const addNewOrder = require('../controllers/orders/AddNewOrder')
const deleteOrder = require('../controllers/orders/DeleteOrder')
const getAllOrder = require('../controllers/orders/GetAllOrder')
const getAllOrderByStatus = require('../controllers/orders/GetAllOrderByStatus')
const getAllOrderByUser = require('../controllers/orders/GetAllOrderByUser')
const updateOrder = require('../controllers/orders/UpdateOrder')
const getOrderDetails = require('../controllers/orders/GetOrderDetails')


router.post('/new', addNewOrder)
router.delete('/delete', deleteOrder)
router.get('/all', getAllOrder)
router.get('/all/status/:status', getAllOrderByStatus)
router.get('/all/users/:customerID', getAllOrderByUser)
router.put('/update', updateOrder)
router.get('/details/:orderID', getOrderDetails)



module.exports = router