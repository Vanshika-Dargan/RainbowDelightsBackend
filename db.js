import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'rainbow_delights',
    password: 'password',
    port: 5434 
});
