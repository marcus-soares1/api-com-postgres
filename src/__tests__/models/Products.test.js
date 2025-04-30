jest.mock('../../database/index', ()=> ({
    query: jest.fn()
}))

const { query } = require('../../database/index')
const Products = require('../../models/Products')

describe('Products model', ()=>{
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('findAll', () => {
        it('should get a products list', async()=>{
            const mockRows = [
                { id: 1, name: 'Produto 1', description: 'Descrição 1', price: 100, stock_quantity: 10, is_active: true, created_at: '2023-01-01', updated_at: '2023-01-01' },
                { id: 2, name: 'Produto 2', description: 'Descrição 2', price: 200, stock_quantity: 20, is_active: false, created_at: '2023-02-01', updated_at: '2023-02-01' },
            ]

            query.mockResolvedValue({ rows: mockRows })

            const result = await Products.findAll()

            expect(query).toHaveBeenCalledWith('SELECT * FROM products;')
            expect(result).toHaveLength(mockRows.length)
            result.forEach((product, index) => {
                expect(product).toBeInstanceOf(Products);
                expect(product.id).toBe(mockRows[index].id);
                expect(product.name).toBe(mockRows[index].name);
                expect(product.description).toBe(mockRows[index].description);
                expect(product.price).toBe(mockRows[index].price);
                expect(product.stockQuantity).toBe(mockRows[index].stock_quantity);
                expect(product.isActive).toBe(mockRows[index].is_active);
                expect(product.createdAt).toEqual(new Date(mockRows[index].created_at));
                expect(product.updatedAt).toEqual(new Date(mockRows[index].updated_at));
            })

        })
    })

    describe('findById', () => {
        it('should get a product by id', async()=>{
            const mockRow = { id: 1, name: 'Produto 1', description: 'Descrição 1', price: 100, stock_quantity: 10, is_active: true, created_at: '2023-01-01', updated_at: '2023-01-01' }

            query.mockResolvedValue({ rows: [mockRow] })

            const result = await Products.findById(1)

            expect(query).toHaveBeenCalledWith('SELECT * FROM products WHERE id = $1', [1])
            expect(result).toBeInstanceOf(Products)
            expect(result.id).toBe(mockRow.id)
            expect(result.name).toBe(mockRow.name)
            expect(result.description).toBe(mockRow.description)
            expect(result.price).toBe(mockRow.price)
            expect(result.stockQuantity).toBe(mockRow.stock_quantity)
            expect(result.isActive).toBe(mockRow.is_active)
            expect(result.createdAt).toEqual(new Date(mockRow.created_at))
            expect(result.updatedAt).toEqual(new Date(mockRow.updated_at))
        })
    })

    describe('create', () => {
        it('should create a new product', async()=>{
            const mockRow = { name: 'Produto 1', description: 'Descrição 1', price: 100, stock_quantity: 10, is_active: true }
            query.mockResolvedValue({rows: [mockRow]})

            const result = await Products.create(mockRow)

            expect(query).toHaveBeenCalledWith(`INSERT INTO products (name, description, price, stock_quantity, is_active)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *`,[mockRow.name, mockRow.description, mockRow.price, mockRow.stockQuantity, mockRow.isActive])
            expect(result).toBeInstanceOf(Products)
            expect(result.name).toBe(mockRow.name)
            expect(result.description).toBe(mockRow.description)
            expect(result.price).toBe(mockRow.price)
            expect(result.stockQuantity).toBe(mockRow.stock_quantity)
            expect(result.isActive).toBe(mockRow.is_active)            
        })
    })

    describe('update', ()=>{
        it('should update a product', async ()=>{
            const mockRow = { id: 1, name: 'Produto 1', description: 'Descrição 1', price: 100, stock_quantity: 10, is_active: true,  created_at: new Date('2023-01-01'), updated_at: new Date('2023-01-01') }
            const updatedInfo = { id: 1, name: 'Updated product', description: 'Updated description'}
            const updatedRow = {
                id: 1,
                name: updatedInfo.name || mockRow.name,
                description: updatedInfo.description || mockRow.description,
                price: updatedInfo.price || mockRow.price,
                stock_quantity: updatedInfo.stock_quantity || mockRow.stock_quantity,
                is_active: updatedInfo.isActive || mockRow.is_active,
                created_at: updatedInfo.created_at || mockRow.created_at,
                updated_at: updatedInfo.updated_at || mockRow.updated_at,
            }

            query.mockResolvedValueOnce({rows: [mockRow]})
            query.mockResolvedValueOnce({rows: [updatedRow]})

            const result = await Products.update(updatedInfo.id, updatedInfo)


            expect(query).toHaveBeenNthCalledWith(1, `SELECT * FROM products WHERE id = $1`, [updatedInfo.id])

            expect(result).toBeInstanceOf(Products)
            expect(result.name).toBe(updatedRow.name)
            expect(result.description).toBe(updatedRow.description)
            expect(result.price).toBe(updatedRow.price)
            expect(result.stockQuantity).toBe(updatedRow.stock_quantity)
            expect(result.isActive).toBe(updatedRow.is_active)
            expect(result.createdAt).toEqual(updatedRow.created_at)
            expect(result.updatedAt).toEqual(updatedRow.updated_at)
            
        })
    })

    describe('deleteById', ()=>{
        it('should delete a prodct by id', async ()=>{

            const productId = 1
            const expectedMessage = { message: `Product deleted sucessfully.` }
            query.mockResolvedValue({})
            
            const result = await Products.deleteById(productId)

            expect(result).toStrictEqual(expectedMessage)

            expect(query).toHaveBeenCalledWith(`DELETE FROM products WHERE id = $1`, [productId])
            expect(result).toEqual(expectedMessage)
        })
    })

})