const customersController = require('../controllers/customersController')

const customersRouter = require('express').Router()

customersRouter.get('/customers', customersController.index)
customersRouter.get('/customers/:id', customersController.show)
customersRouter.post('/customers', customersController.create)
customersRouter.put('/customers/:id', customersController.update)
customersRouter.delete('/customers/:id', customersController.delete)

module.exports = customersRouter