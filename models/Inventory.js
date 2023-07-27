const mongoose = require('mongoose')

const inventoryItemsSchema = mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    quantity: {
        type: Number
    },
},
    {
        timestamps: true
    })

const InventoryItems = mongoose.model('InventoryItems', inventoryItemsSchema)

module.exports = { InventoryItems }