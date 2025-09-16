const { createRouter, pool, tryCatch, hashids } = require("../utils/core");
const router = createRouter();

router.post("/:id", tryCatch(async (req, res) => {
    const [bookId] = hashids.decode(req.params.id);

    const borrowedCheck = await pool.query(
        "SELECT is_borrowed FROM books WHERE id = $1",
        [bookId]
    );

    if (borrowedCheck.rows[0].is_borrowed) {
        return res.status(401).json({ error: "This book is already borrowed!" })
    }

    if (!req.session.user_id) {
        return res.status(401).json({ error: "Log in to borrow a book!" });
    }

    const userLimitCheck = await pool.query(
        "SELECT id FROM books WHERE borrowed_by = $1",
        [req.session.user_id]
    );

    if (userLimitCheck.rows.length > 5) {
        return res.status(401).json({ error: "You've already borrowed the max number of books (5)!" });
    }

    const result = await pool.query(
        `UPDATE books
            SET is_borrowed = true,
            borrowed_by = $1
        WHERE id = $2`,
        [req.session.user_id, bookId]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({ error: "Couldn't find that book" })
    }

    res.status(200).json({ success: true })
}));

module.exports = router;