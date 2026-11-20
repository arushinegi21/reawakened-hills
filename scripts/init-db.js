/**
 * scripts/init-db.js
 * Database initialization script that reads schema.sql and runs it against standalone MySQL
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function initializeDatabase() {
    console.log('🔄 [DB Init] Connecting to MySQL Server...');
    
    // Connect without database name first to create it
    const connectionConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        multipleStatements: true
    };

    let connection;
    try {
        connection = await mysql.createConnection(connectionConfig);
        console.log('✅ Connected to MySQL server.');

        const schemaPath = path.join(__dirname, '..', 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('🔄 Executing schema.sql...');
        await connection.query(schemaSql);
        console.log('🎉 Database and tables initialized and seeded successfully!');
    } catch (err) {
        console.error('❌ Database initialization error:', err.message);
        console.log('\n💡 Tip: Verify that MySQL service is running and credentials in .env are correct.');
    } finally {
        if (connection) await connection.end();
    }
}

if (require.main === module) {
    initializeDatabase();
}

module.exports = initializeDatabase;
