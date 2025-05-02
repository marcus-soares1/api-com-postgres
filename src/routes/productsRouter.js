const productsRouter = require('express').Router()
const productsController = require('../controllers/productsController')

productsRouter.get('/products', productsController.index)
productsRouter.get('/products/:id', productsController.show)
productsRouter.post('/products', productsController.create)
productsRouter.put('/products/:id', productsController.update)
productsRouter.delete('/products/:id', productsController.delete)


module.exports = productsRouter