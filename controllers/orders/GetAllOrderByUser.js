const asyncHandler = require('express-async-handler');
const { Orders } = require('../../models/Orders');
const { ObjectId } = require('mongodb');

const getAllOrderByUser = asyncHandler(async (req, res) => {
    const { customerID } = req.params;

    const allOrderByUser = await Orders.aggregate([
        {
            $match: {
                customerID: new ObjectId(customerID)
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
            $unwind: "$items"
        },
        {
            $lookup: {
                from: "products",
                localField: "items.productID",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $unwind: "$product"
        },
        {
            $lookup: {
                from: "productdescriptions",
                localField: "product.productCode",
                foreignField: "_id",
                as: "productDescriptions"
            }
        },
        {
            $unwind: "$productDescriptions"
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    customerID: "$customerID",
                    paymentMethod: "$paymentMethod",
                    courier: "$courier",
                    address: "$address",
                    contactNumber: "$contactNumber",
                    orderStatus: "$orderStatus"
                },
                items: {
                    $push: {
                        productName: "$productDescriptions.productName",
                        desc: "$productDescriptions.desc",
                        category: "$productDescriptions.category",
                        productCode: "$product.productCode",
                        image: {
                            id: "$product.image.id",
                            url: "$product.image.url"
                        },
                        variants: "$product.variant",
                        price: "$product.price"
                    }
                }
            }
        },
        {
            $project: {
                _id: "$_id._id",
                customerID: "$_id.customerID",
                paymentMethod: "$_id.paymentMethod",
                courier: "$_id.courier",
                address: "$_id.address",
                contactNumber: "$_id.contactNumber",
                orderStatus: "$_id.orderStatus",
                items: 1
            }
        }
    ]);

    res.status(200).json(allOrderByUser);
});

module.exports = getAllOrderByUser;