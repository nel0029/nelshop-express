const asyncHandler = require('express-async-handler');
const { Users, UserAddress } = require('../../models/Users')

const updateUserAddress = asyncHandler(async (req, res) => {
    const { ownerID, region, province, cityMunicipality, barangay, otherInfo, postalCode } = req.body

    const userExist = await Users.findById(ownerID)

    if (userExist) {
        const addressExists = await UserAddress.findOne({ ownerID: userExist._id })

        if (addressExists) {
            // Update the existing address with the new data
            addressExists.region = region
            addressExists.province = province
            addressExists.cityMunicipality = cityMunicipality
            addressExists.barangay = barangay
            addressExists.otherInfo = otherInfo
            addressExists.postalCode = postalCode

            // Save the updated address
            const updatedAddress = await addressExists.save()

            res.status(200).json(updatedAddress)
        } else {
            res.status(404).json({ message: "No address found" })
        }
    } else {
        res.status(404).json({ message: "User not found" })
    }
})

module.exports = updateUserAddress
