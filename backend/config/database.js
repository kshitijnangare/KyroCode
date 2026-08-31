import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Initialize Sequelize instance with local PostgreSQL credentials
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres', // Tells Sequelize to use the pg driver
        logging: false,      // Set to console.log to see raw SQL queries
    }
);

// Function to test the connection
const connectPostgreSQL = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL database connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error.message);
        process.exit(1); // Stop server setup if connection fails
    }
};

export { sequelize, connectPostgreSQL };
