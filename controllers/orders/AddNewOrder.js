const asyncHandler = require('express-async-handler');
const { Orders, OrderItems } = require('../../models/Orders')
const { InventoryItems } = require('../../models/Inventory')
const { Users } = require('../../models/Users')

const addNewOrder = asyncHandler(async (req, res) => {
    const { customerID, paymentMethod, courier, items } = req.body

    const userExist = await Users.findById(customerID)
    if (userExist) {
        const newOrder = await Orders.create({
            customerID,
            paymentMethod,
            courier,
            address: userExist.address,
            contactNumber: userExist.contactNumber,
            orderStatus: "Pending"
        })

        if (newOrder) {
            let orderItems = []
            for (const item of items) {
                const productExists = await InventoryItems.findOne({ productID: item.productID });

                if (productExists && productExists.quantity >= item.quantity) {
                    const newOrderItem = {
                        orderID: newOrder._id,
                        productID: productExists._id,
                        quantity: item.quantity,
                        price: productExists.price * item.quantity
                    };

                    const createdOrderItem = await OrderItems.create(newOrderItem);
                    orderItems.push(createdOrderItem);
                    productExists.quantity -= item.quantity
                    await productExists.save()
                }
            }

            const orderDetails = {
                orderID: newOrder._id,
                customerID: newOrder.customerID,
                paymentMethod: newOrder.paymentMethod,
                courier: newOrder.courier,
                address: newOrder.address,
                contactNumber: newOrder.contactNumber,
                items: orderItems
            }
            res.status(200).json(orderDetails)
        }
    }

})

module.exports = addNewOrder