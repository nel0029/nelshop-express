const mongoose = require('mongoose')


const ordersSchema = mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    paymentMethod: {
        type: String
    },
    courier: {
        type: mongoose.Schema.Types.ObjectId
    },
    address: {
        type: String
    },
    contactNumber: {
        type: String
    },
    orderStatus: {
        type: String
    }
},
    {
        timestamps: true
    })

const orderItemsSchema = mongoose.Schema({
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders"
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    }
},
    {
        timestamps: true
    })


const Orders = mongoose.model('Orders', ordersSchema)
const OrderItems = mongoose.model('OrderItems', orderItemsSchema)
module.exports = { Orders, OrderItems }