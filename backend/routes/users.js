const { createRouter, pool, tryCatch } = require("../utils/core");
const bcrypt = require("bcrypt")
const router = createRouter();

router.post("/", tryCatch(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "You can't leave the email and password empty!" });
    }

    const newEmail = String(email).trim().toLowerCase();
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
        "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
        [newEmail, passwordHash]
    );

    if (result.rowCount === 0) {
        return res.status(500).json({ error: "User wasn't created for some unknown reason. Blame the DB gods." })
    }

    res.status(200).json({ success: true })
}))

module.exports = router;