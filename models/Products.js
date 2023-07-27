const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    productName: {
        type: String
    },
    desc: {
        type: String
    },
    category: {
        type: String
    },
    image: [
        {
            name: String,
            url: String
        }
    ],
    price: {
        type: Number
    }
},
    {
        timestamps: true
    })


const Products = mongoose.model('Products', productsSchema)


module.exports = {
    Products
}