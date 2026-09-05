import { redis } from "../config/redis";

/* ==================================================
            Authentication & Authorization
================================================== */

const storeRefreshToken = async (userId, tokenId, hashedToken, ttlSeconds) => {
    try {
        const redisKey = `refresh_token:${userId}:${tokenId}`;
        const redisValue = hashedToken;
        const redisTtl = ttlSeconds || 2592000;

        const res = await redis.set(redisKey, redisValue, 'EX', redisTtl);
        return res;
    } catch (error) {
        console.error(error, "Failed to store refresh token in redis");
        throw error;
    }
}

const getRefreshToken = async (userId, tokenId) => {
    try {
        const redisKey = `refresh_token:${userId}:${tokenId}`;
        const hashed_refresh_token = await redis.get(redisKey);
        return hashed_refresh_token;
    } catch (error) {
        console.error(error, "Cannot retrieve refresh token");
        throw error;
    }
}

const deleteRefreshToken = async (userId, tokenId) => {
    try {
        const redisKey = `refresh_token:${userId}:${tokenId}`;
        const isDeleted = await redis.del([redisKey]);
        return isDeleted;
    } catch (error) {
        console.error(error, "Cannot delete refresh token");
        throw error;
    }
}

const revokeAllUserTokens = (userId) => {
    return new Promise((resolve, reject) => {
        const redisKey = `refresh_token:${userId}:*`;
        let totalDeleted = 0;

        const stream = redis.scanStream({
            match: redisKey,
            count: 100
        });

        stream.on('data', async (resultKeys) => {
            if (resultKeys.length > 0) {
                stream.pause(); // Pause stream to handle batch
                try {
                    const deletedCount = await redis.del(...resultKeys);
                    totalDeleted += deletedCount;
                    stream.resume(); // Resume stream after delete completes
                } catch (error) {
                    stream.destroy(); // Stop stream on error
                    reject(error);   // Reject outer promise
                }
            }
        });

        stream.on('end', () => {
            console.log(`Access revoked from ${totalDeleted} devices`);
            resolve(totalDeleted); // Resolve outer promise when finished
        });

        stream.on('error', (error) => {
            reject(error);
        });
    });
};

const hasRefreshToken = async (userId, tokenId) => {
    try {
        const redisKey = `refresh_token:${userId}:${tokenId}`;
        const doesExists = await redis.exists(redisKey);
        return doesExists;
    } catch (error) {
        console.error(error, "Error occurred in checking if token exists");
        throw error;
    }
}

/* ==================================================
            Email Verification
================================================== */

const storeEmailVerificationToken = async (userId, hashedTokenId) => {
    try {
        const redisKey = `email_verify:${hashedTokenId}`;
        const redisValue = userId;
        const redisTtl = 60 * 60;

        const res = await redis.set(redisKey, redisValue, 'EX', redisTtl);
        return res;
    } catch (error) {
        console.error(error, "Some error occured while storing email verification token");
        throw error;
    }
}

const getEmailVerificationToken = async (tokenId) => {
    try {
        const redisKey = `email_verify:${tokenId}`;
        const emailToken = await redis.get(redisKey);
        return emailToken;
    } catch (error) {
        console.error(error, "Cannot retrieve email token");
        throw error;
    }
}

const deleteEmailVerificationToken = async (tokenId) => {
    try {
        const redisKey = `email_verify:${tokenId}`;
        const isDeleted = await redis.del([redisKey]);
        return isDeleted;
    } catch (error) {
        console.error(error, "Cannot delete Email token");
        throw error;
    }
}

/* ==================================================
            Password Verification
================================================== */

export { storeRefreshToken, getRefreshToken, deleteRefreshToken, revokeAllUserTokens, hasRefreshToken, storeEmailVerificationToken, getEmailVerificationToken, deleteEmailVerificationToken };