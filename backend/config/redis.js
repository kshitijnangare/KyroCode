import { Redis } from 'ioredis';

const redis = new Redis();

const connectRedis = async () => {
    try {
        // await redis.connect();
        await redis.ping(); // Tests if Redis responds with PONG
        console.log('✅ Redis connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to Redis:', error.message);
        process.exit(1); // Stop server setup if Redis connection fails
    }
};

export { redis, connectRedis };