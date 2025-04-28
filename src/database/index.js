require('dotenv').config()
const { Pool } = require("pg")

const pool = new Pool({
    connectionString: `postgresql://${process.env.POSTGRE_USER ?? 'postgres'}:${process.env.POSTGRE_PASSWORD ?? ''}@${process.env.HOST ?? 'localhost'}:${process.env.POSTGRE_PORT ?? '5432'}/${process.env.DATABASE_NAME ?? 'postgres'}`
})

async function query(queryString, params, callback){
    return pool.query(queryString, params, callback)
}

module.exports = { query }