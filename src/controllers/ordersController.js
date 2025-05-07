const Orders = require("../models/Orders")

const orderController = {
    // GET /api/orders
    index: async (req, res) =>{
        const orders = await Orders.findAll()

        res.json(orders)
    },

    // POST /api/orders
    create: async (req, res) => {
        const { customerId, products } = req.body
        const order = await Orders.create(customerId, products)

        if(!(order instanceof Orders))
        {
           return res.status(400).json(order)
        }

        return res.status(201).json(order)
    }
}

module.exports = orderController