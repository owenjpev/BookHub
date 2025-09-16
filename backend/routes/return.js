const { createRouter, pool, tryCatch, hashids } = require("../utils/core");
const router = createRouter();

router.post("/:id", tryCatch(async (req, res) => {
    const [bookId] = hashids.decode(req.params.id)

    const borrowedCheck = await pool.query(
        "SELECT is_borrowed, borrowed_by FROM books WHERE id = $1",
        [bookId]
    );

    if (borrowedCheck.rows[0].is_borrowed === false || borrowedCheck.rows[0].borrowed_by != req.session.user_id) {
        return res.status(401).json({ error: "You don't own this book!" })
    }

    if (!req.session.user_id) {
        return res.status(401).json({ error: "Log in to return a book!" });
    }

    const result = await pool.query(
        `UPDATE books
            SET is_borrowed = false,
            borrowed_by = null
        WHERE id = $1`,
        [bookId]
    );

    if (result.rowCount.length === 0) {
        return res.status(404).json({ error: "Couldn't find that book" })
    }

    res.status(200).json({ success: true })
}));

module.exports = router;