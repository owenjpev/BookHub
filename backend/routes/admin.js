const { createRouter, pool, tryCatch } = require("../utils/core");
const { requireAdmin } = require("../middleware/auth")
const bcrypt = require("bcrypt")
const router = createRouter();

router.post("/", requireAdmin, tryCatch(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "You can't leave the email and password empty!" })
    }

    const newEmail = String(email).trim().toLowerCase();
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
        "INSERT INTO users (email, password_hash, is_admin) VALUES ($1, $2, true)",
        [newEmail, passwordHash]
    );

    if (result.rowCount === 0) {
        return res.status(500).json({ error: "Admin wasn't created for unknown reason" })
    }

    res.status(200).json({ success: true })
}))

module.exports = router;