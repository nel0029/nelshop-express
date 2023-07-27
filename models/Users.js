const mongoose = require('mongoose')


const usersSchema = mongoose.Schema({
    name: {
        type: String
    },
    contactNumber: {
        type: String
    },
    role: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    profilePicture: {
        name: String,
        url: String
    }
},
    {
        timestamps: true
    })

const addressSchema = mongoose.Schema({
    ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    region: {
        type: String
    },
    province: {
        type: String
    },
    cityMunicpality: {
        type: String
    },
    barangay: {
        type: String
    },
    otherInfo: {
        type: String
    },
    postalCode: {
        type: String
    }
},
    {
        timestamps: true
    })

const Users = mongoose.model('Users', usersSchema)
const UserAddress = mongoose.model('UserAddress', addressSchema)

module.exports = { Users, UserAddress }