const asyncHandler = require('express-async-handler');
const { Users, UserAddress } = require('../../models/Users')

const addNewAddress = asyncHandler(async (req, res) => {
    const { ownerID, region, province, cityMunicipality, barangay, otherInfo, postalCode } = req.body

    const userExist = await Users.findById(ownerID)

    if (userExist) {
        const newAddress = await UserAddress.create({
            ownerID,
            region,
            province,
            cityMunicipality,
            barangay,
            otherInfo,
            postalCode
        })

        res.status(200).json(newAddress)
    } else {
        res.status(404).json({ message: "User not found" })
    }
})

module.exports = addNewAddress