const express = require('express')
const router = express.Router()

const addNewInventoryItem = require('../controllers/inventory/AddNewInventoryItem')
const getAllInventoryItems = require('../controllers/inventory/GetAllInventoryItem')
const deleteInventoryItem = require('../controllers/inventory/DeleteInventoryItem')
const updateInventoryItem = require('../controllers/inventory/UpdateInventoryItem')
const getInventoryDetails = require('../controllers/inventory/GetInventoryItemDetails')
const filterInventoryItems = require('../controllers/inventory/FilterInventoryItems')


router.post('/new', addNewInventoryItem)
router.get('/all', getAllInventoryItems)
router.delete('/delete', deleteInventoryItem)
router.put('/update', updateInventoryItem)
router.get('/details/:inventoryID', getInventoryDetails)
router.get('/search', filterInventoryItems)

module.exports = router