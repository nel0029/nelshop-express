const asyncHandler = require('express-async-handler');
const { Orders, OrderItems } = require('../../models/Orders')


const deleteOrder = asyncHandler(async (req, res) => {
    const { orderID } = req.body

    const orderExists = await Orders.findById(orderID)
    if (orderExists) {
        const deletedOrder = await Orders.findByIdAndDelete(orderExists._id)
        await OrderItems.deleteMany({ orderID: deletedOrder._id })

        res.status(200).json(deletedOrder)
    } else {
        res.status(404).json({ message: "Order not found" })
    }
})

module.exports = deleteOrder