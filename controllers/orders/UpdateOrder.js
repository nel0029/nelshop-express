const asyncHandler = require('express-async-handler');
const { Orders, OrderItems } = require('../../models/Orders')

const updateOrder = asyncHandler(async (req, res) => {
    const { orderID, status } = req.body

    const orderExists = await Orders.findById(orderID)

    if (orderExists) {
        status && (orderExists.status = status)
        await orderExists.save()

        res.status(200).json(orderExists)
    } else {
        res.status(404).json({ message: "Order not found" })
    }
})

module.exports = updateOrder