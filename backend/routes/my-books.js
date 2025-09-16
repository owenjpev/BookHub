const { createRouter, pool, tryCatch, hashids } = require("../utils/core");
const { requireLogin } = require("../middleware/auth")
const router = createRouter();

router.get("/", requireLogin, tryCatch(async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM books WHERE borrowed_by = $1",
        [req.session.user_id]
    );

    if (result.rows.length === 0) {
        return res.status(400).json({ error: "There are no books!" })
    }

    const books = result.rows.map(book => ({
        ...book,
        id: hashids.encode(book.id),
    }));

    res.status(200).json({ success: true, books })
}));

module.exports = router;