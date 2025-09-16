function requireAdmin(req, res, next) {
    if (!req.session.is_admin) {
        return res.status(403).json({ error: "This is for admins only!" });
    }
    next();
}

function requireLogin(req, res, next) {
    if (!req.session.user_id) {
        return res.status(401).json({ error: "You need to log in first!" });
    }
    next();
}

module.exports = { requireAdmin, requireLogin };
