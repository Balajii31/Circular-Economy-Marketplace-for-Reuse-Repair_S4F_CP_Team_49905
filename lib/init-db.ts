import { sql } from '../lib/db';
await sql`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'consumer',
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

await sql`
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    condition VARCHAR(50) NOT NULL,
    age VARCHAR(50),
    market_value DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

await sql`
  CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    action VARCHAR(50) NOT NULL,
    carbon_saved DECIMAL(10,2),
    reward_points INTEGER,
    status VARCHAR(50),
    date TIMESTAMP DEFAULT NOW()
  );
`;

console.log('Database initialized successfully');
