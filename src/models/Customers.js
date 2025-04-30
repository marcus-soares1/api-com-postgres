class Customers{
    constructor(customerRow)
    {
        this.name = atributtes.name
        this.email = atributtes.email
    }

    static async findAll()
    {
        const result = await query(`SELECT * FROM customers;`)

        return result.rows.mao((row)=> new Customers(row))
    }

    static async findById(id)
    {
        const result = await query(`SELECT * FROM customers WHERE id = $1`, [id])

        return new Customers(result.rows[0])
    }

    static async create(name, email)
    {
        const result = await query()

    }

    static async update(id, atributtes)
    {


    }

    static async deleteById(id)
    {


    }
}