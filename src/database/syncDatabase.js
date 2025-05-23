const { query } = require('./index')

async function syncDatabase(){
    await query(`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(10, 2) NOT NULL,
          stock_quantity INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          is_active BOOLEAN DEFAULT TRUE
        );`);
    console.log('Created "products" table.');

    await query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEAFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEAFAULT CURRENT_TIMESTAMP
      );
    `)
    console.log('Created "customers" table.');
    
    await query(`
      CREATE TABLE IF NOT EXISTS orders(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES customers (id),
        total DECIMAL(10, 2) NOT NULL DEFAULT (0),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('Created "orders" table.');

    await query(`
      CREATE TABLE IF NOT EXISTS order_products(
        order_id INT, 
        product_id INT,
        quantity INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (order_id, product_id),
        FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products (id)
      )  
    `)
    console.log('Created "orders_products" table.');

    process.exit(1);
}

syncDatabase()