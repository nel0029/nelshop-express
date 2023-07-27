const asyncHandler = require('express-async-handler');
const { Orders, OrderItems } = require('../../models/Orders');
const { ObjectId } = require('mongodb');


const getOrderDetails = asyncHandler(async (req, res) => {
    const { orderID } = req.params

    const orderExists = await Orders.findById(orderID)
    if (orderExists) {
        const orderDetails = await Orders.aggregate([
            {
                $match: {
                    _id: new ObjectId(orderExists._id)
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
                    items: 1
                }
            }
        ])

        res.status(200).json(orderDetails)
    } else {
        res.status(404).json({ message: "Order Not Found" })
    }
})


module.exports = getOrderDetails