import argon2 from "argon2";

/**
 * Hashes a plain text password using Argon2id algorithm.
 * @param {string} password - Plain text password to hash.
 * @returns {Promise<string>} The generated Argon2id hash.
 */
const hashPassword = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id
        });
        return hashedPassword;
    } catch (error) {
        console.error("Failed to hash the password:", error);
        throw error;
    }
};

/**
 * Verifies a plain text password against an Argon2 hash.
 * @param {string} hash - Stored Argon2 hash.
 * @param {string} password - Plain text password to check.
 * @returns {Promise<boolean>} True if valid, false otherwise.
 */
const verifyPassword = async (hash, password) => {
    try {
        const isMatch = await argon2.verify(hash, password);
        return isMatch;
    } catch (error) {
        console.error("Password verification failed:", error);
        throw error;
    }
};

export { hashPassword, verifyPassword };
