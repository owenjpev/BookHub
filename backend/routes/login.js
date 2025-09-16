const { createRouter, pool, tryCatch } = require("../utils/core");
const bcrypt = require("bcrypt");
const router = createRouter();

router.post("/", tryCatch(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "You can't leave the email and password empty!" })
    }

    const result = await pool.query(
        "SELECT id, password_hash, is_admin FROM users WHERE email = $1",
        [email]
    );

    if (result.rows.length === 0) {
        return res.status(401).json({ error: "Couldn't find an account with that email" })
    }

    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password_hash)

    if (!match) {
        return res.status(401).json({ error: "Incorrect password ggez kid" })
    }

    let redirection = "/my-books";

    req.session.user_id = user.id;
    req.session.is_admin = user.is_admin;

    if (req.session.is_admin) {
        redirection = "/admin"
    }

    console.log(req.session.user_id);

    res.status(200).json({ success: true, isAdmin: req.session.is_admin, redirection })
}))

module.exports = router;