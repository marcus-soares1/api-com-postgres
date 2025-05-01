jest.mock('../../database/index', ()=>({
    query: jest.fn()
}))

const { query } = require("../../database/index")
const Customers = require("../../models/Customers")
const Products = require("../../models/Products")

describe('Customers model', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    describe('findAll', ()=>{
        it('should get all customers', async ()=>{
            const mockRows = [{id: 1, name: 'John', email: 'john@mail.com'}, {id: 2, name: 'Jane', email: 'jane@email.com'}]
            
            query.mockResolvedValue({rows: mockRows})

            const result = await Customers.findAll()

            expect(query).toHaveBeenCalledWith(`SELECT * FROM customers;`)
            expect(result).toHaveLenght(mockRows.length)
            result.forEach((customer, index) => {
                expect(customer).toBeInstanceOf(Customers)
                expect(customer.id).toBe(mockRows[index].id)
                expect(customer.name).toBe(mockRows[index].name)
                expect(customer.email).toBe(mockRows[index].email)
            })

        })
    })

    describe('findById', ()=>{
        it('should find a customer by id', async ()=> {
            const mockRows = [{id: 1, name: 'John', email: 'john@mail.com'}, {id: 2, name: 'Jane', email: 'jane@email.com'}]
            const id = 1

            query.mockResolvedValue({rows: [mockRows.find(row=>row.id === id)]})

            const result = await Customers.findById(id)

            expect(query).toHaveBeenCalledWith(`SELECT * FROM customers WHERE id = $1`, [id])
            expect(result).toBeInstanceOf(Customers)
            expect(result.id).toBe(mockRows.find(row => row.id === id).id)
            expect(result.name).toBe(mockRows.find(row => row.id === id).name)
            expect(result.email).toBe(mockRows.find(row => row.id === id).email)

        })
    }),

    describe('create', ()=>{
        it('should create a new customer',  async ()=>{
            const mockRow = { name: 'John', email: 'john@mail.com'}

            query.mockResolvedValue({rows: [mockRow]})

            const result = await Customers.create(mockRow)

            expect(query).toHaveBeenCalledWith(
                `INSERT INTO customers (name, email)
                VALUES (1$, 2$)
                RETURNING *`, [mockRow.name, mockRow.email]
            )

            expect(result).toBeInstanceOf(Customers)
            expect(result.name).toBe(mockRow.name)
            expect(result.email).toBe(mockRow.email)

        })
    })

    describe('update', ()=>{
        it('should update a customer', async()=>{
            const mockOriginalRow = { id: 1, name: 'John', email: 'john@mail.com'}
            const updatedInfo = { mail: 'john@email.com' }
            const updatedRow = { id: 1, name: 'John', email: 'john@email.com'}

            query.mockResolvedValueOnce({rows: [mockOriginalRow]})

            const result = await Customers.update(mockOriginalRow.id, updatedInfo)

            expect(query).toHaveBeenCalledWith(`SELECT * FROM customers WHERE id = $1`, [mockOriginalRow.id])
            expect(result).toBeInstanceOf(Customers)
            expect(result.id).toBe(updatedRow.id)
            expect(result.name).toBe(updatedRow.name)
            expect(result.email).toBe(updatedRow.email)
        })
    })

    describe('deleteById', ()=>{
        it('should delete a customer', async ()=>{
            const deletedId = 1
            const expectedMessage = { message: `Product deleted sucessfully.` }
            query.mockResolvedValue({})

            const result = await Products.deleteById(deletedId)


            expect(query).toHaveBeenCalledWith(`DELETE FROM customers WHERE id = $1`, [deletedId])
            expect(result).toEqual(expectedMessage)

        })
    })
})