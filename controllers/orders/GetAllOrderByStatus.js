const asyncHandler = require('express-async-handler');
const { Orders } = require('../../models/Orders')


const getAllOrderByStatus = asyncHandler(async (req, res) => {
    const { status } = req.params

    const orders = await Orders.aggregate([
        {
            $match: {
                orderStatus: status
            }
        },
        {
            $lookup: {
                from: "orderitems",
                localField: "_id",
                foreignField: "orderID",
                as: "items"
            }
        },
        {
            $project: {
                _id: 1,
                customerID: 1,
                paymentMethod: 1,
                courier: 1,
                address: 1,
                contactNumber: 1,
                orderStatus: 1,
                items: 1,
            }
        }
    ])

    res.status(200).json(orders)
})

module.exports = getAllOrderByStatus