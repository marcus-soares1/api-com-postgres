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
    },

    // GET /api/orders/:id
    show: async (req, res) => {
        const { id } = req.params

        const order = await Orders.findById(+id)

        if(!order) return res.status(404).json(order)

        return res.json(order)
    },

    // DELETE /api/order/:id
    delete: async (req, res) => {
        const { id } = req.params

        const message = await Orders.delete(+id)

        if(!message) return res.status(404).json(message)

        return res.json(message)
    },

}

module.exports = orderController