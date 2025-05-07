const ordersRouter = require('express').Router()
const orderController = require('../controllers/ordersController')

ordersRouter.get('/orders', orderController.index)
ordersRouter.post('/orders', orderController.create)

module.exports = ordersRouter