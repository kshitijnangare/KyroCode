/**
 * Normalizes the user object from the token.
 * Provides aliases (id, userId, user_id) so all controllers work,
 * regardless of which variable name they prefer.
 */

const normalizeDecodedUser = (decoded) => {
    if (!decoded) return null;

    // Extract the ID from whichever field holds it in the token
    const idValue = decoded.user_id || decoded.userId || decoded.id || decoded.sub;

    return {
        // 1. The Real Data (Snake Case for DB consistency)
        user_id: idValue,
        full_name: decoded.full_name || decoded.fullName || decoded.name || decoded.email,
        email: decoded.email,
        role: decoded.role,
        company_id: decoded.company_id || decoded.companyId,
        is_poc: decoded.is_poc || false,

        // 2. Aliases (For compatibility with all controllers)
        id: idValue,      // For controllers using req.user.id
        userId: idValue,  // For controllers using req.user.userId
        companyId: decoded.company_id || decoded.companyId // CamelCase alias
    };
};

