const ordersRouter = require('express').Router()
const orderController = require('../controllers/ordersController')

ordersRouter.get('/orders', orderController.index)
ordersRouter.get('/orders/:id', orderController.show)
ordersRouter.post('/orders', orderController.create)
ordersRouter.delete('/orders/:id', orderController.delete)

module.exports = ordersRouter