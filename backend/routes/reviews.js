const { createRouter, pool, tryCatch, hashids } = require("../utils/core");
const { requireLogin, requireAdmin} = require("../middleware/auth")
const router = createRouter();

router.get("/", requireAdmin, tryCatch(async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM reviews"
    );
    res.status(200).json({ reviews: result.rows })
}))

router.get("/:id", tryCatch(async (req, res) => {
    const [bookId] = hashids.decode(req.params.id);

    const result = await pool.query(
        "SELECT * FROM reviews WHERE book_id = $1",
        [bookId]
    );

    res.status(200).json({ success: true, reviews: result.rows })
}))

router.post("/:id", requireLogin, tryCatch(async (req, res) => {
    if (!req.body.rating || !req.body.comment) {
        return res.status(400).json({ error: "You're missing something!" })
    }

    const [bookId] = hashids.decode(req.params.id)

    const ownerCheck = await pool.query(
        "SELECT borrowed_by FROM books WHERE id = $1",
        [bookId]
    );

    if (ownerCheck.rows[0].borrowed_by != req.session.user_id) {
        return res.status(401).json({ error: "You have to own the book to write a review!" })
    }

    const result = await pool.query(
        "INSERT INTO reviews (user_id, book_id, rating, comment) VALUES ($1, $2, $3, $4)",
        [req.session.user_id, bookId, req.body.rating, req.body.comment]
    );

    res.status(200).json({ success: true })
}))

module.exports = router;