const { query } = require("../database/index")

class Customers{
    constructor(customerRow)
    {
        this.name = customerRow.name
        this.email = customerRow.email
    }

    static async findAll()
    {
        const result = await query(`SELECT * FROM customers;`)

        return result.rows.map((row)=> new Customers(row))
    }

    static async findById(id)
    {
        const result = await query(`SELECT * FROM customers WHERE id = $1`, [id])

        return new Customers(result.rows[0])
    }

    static async create(name, email)
    {
        const result = await query(`INSERT INTO customers (name, email)
            VALUES($1, $2) RETURNING *`, [name, email])
        
        return new Customers(result.rows[0])
        

    }

    static async update(id, atributtes)
    {
        const { rows } = await query(`SELECT * FROM customers WHERE id = $1`, [id])
        if(!rows[0]) return null
        
        const result = await query(`UPDATE customers SET
                name = $1,
                email = $2
            WHERE id = $3
            RETURNING *`, [atributtes.name, atributtes.email, id])

        return new Customers(result.rows[0])

    }

    static async deleteById(id)
    {
        await query(`DELETE FROM products WHERE id = $1`, [id])
        return { message: `Customer deleted sucessfully.` }

    }
}

module.exports = Customers