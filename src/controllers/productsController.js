const Products = require("../models/Products")

const productsController = {
    // GET /api/products
    index: async (req, res) => {
        const products = await Products.findAll()

        res.json(products)
    },

    // GET /api/products/:id
    show: async(req, res) => {
        // Não está sendo a validação de maneira proposital. 
        // Para mais informações, acesse o README do proejto no campo 'Objetivo e avisos'.
        const product = await Products.findById(req.params.id)
        if(!product) res.status(404).json({message: 'Produto não encontrado.'})
        res.json(product)
    },
    
    // POST /api/products
    create:  async(req, res) => {
        const newProduct = await Products.create(req.body)
        res.status(201).json(newProduct)

    },

    // PUT /api/products/:id
    update: async(req, res) => {
        const updatedProduct = await Products.update(req.params.id, req.body)
        if(!updatedProduct) res.status(404).json({message: 'Produto não encontrado.'})
        res.json(updatedProduct)
    },

    // DELETE /api/products/:id
    delete: async (req, res) => {    
        const message = await Products.deleteById(req.params.id)
        res.json(message)
    }
} 

module.exports = productsController