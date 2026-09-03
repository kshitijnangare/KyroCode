/**
 * Normalizes the user object from the token.
 * Provides aliases (id, userId, user_id) so all controllers work,
 * regardless of which variable name they prefer.
 */

const normalizeDecodedUser = (decoded) => {
    if (!decoded) return null;

    // Extract the ID from whichever field holds it in the token
    const idValue = decoded.user_id || decoded.userId || decoded.id;

    return {
        user_id: idValue,
        display_name: decoded.display_name || decoded.displayName || decoded.email,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role,

        // 2. Aliases (For compatibility with all controllers)
        id: idValue,      // For controllers using req.user.id
        userId: idValue,  // For controllers using req.user.userId
        companyId: decoded.company_id || decoded.companyId // CamelCase alias
    };
};

