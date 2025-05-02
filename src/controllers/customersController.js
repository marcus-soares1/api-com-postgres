const Customers = require("../models/Customers")

const customersController = {
    // GET /api/customers
    index: async (req, res) => {
        const customers = await Customers.findAll()

        res.json(customers)
    },

    // GET /api/customers/:id
    show: async (req, res) => {
        const { id }  = req.params

        const customer = await Customers.findById(+id)
        if(!customer) return res.status(400).json({message: 'Customer not found.'})

        res.json(customer)
    },

    // POST /api/customers
    create: async (req, res) => {
        const { name, email } = req.body

        const customer = await Customers.create(name, email)
        
        res.status(201).json(customer)
    },

    // PUT /api/customers/:id
    update: async (req, res) => {
        const { name, email } = req.body
        const { id } = req.params

        const updatedCustomer = await Customers.update(+id, {name, email})
        if(!updatedCustomer) return res.status(400).json({message: 'Customer not found.'})

        res.json(updatedCustomer)
    },

    // DELETE /api/customers/:id
    delete: async (req, res) => {
        const { id } = req.params

        const message = await Customers.deleteById(+id)

        res.json(message)
    }

}

module.exports = customersController