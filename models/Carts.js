const mongoose = require('mongoose')

const cartsSchema = mongoose.Schema({
    ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }
},
    {
        timestamps: true
    })

const cartItemsSchema = mongoose.Schema({
    cartID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts"
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    quantity: {
        type: Number
    },
    totalPrice: {
        type: Number
    }
},
    {
        timestamps: true
    })

const Carts = mongoose.model('Carts', cartsSchema)
const CartItems = mongoose.model('CartItems', cartItemsSchema)
module.exports = { Carts, CartItems }