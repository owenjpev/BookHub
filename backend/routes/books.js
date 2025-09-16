const { createRouter, pool, tryCatch, hashids } = require("../utils/core");
const { requireAdmin } = require("../middleware/auth")
const router = createRouter();

router.post("/", requireAdmin, tryCatch(async (req, res) => {
    const { title, author, image, genre, description } = req.body;

    if (!title || !author || !image || !genre || !description) {
        return res.status(400).json({ error: "You're missing something!" })
    }

    const result = await pool.query(
        "INSERT INTO books (title, author, image, genre, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [title, author, image, genre, description]
    );

    if (result.rowCount === 0) {
        return res.status(500).json({ error: "Something went wrong!" })
    }

    res.status(201).json({ success: true, book: result.rows[0] });
}));

router.get("/", tryCatch(async (req, res) => {
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";

    let sql = "SELECT * FROM books";
    const params = [];

    if (search) {
        sql += " WHERE title ILIKE $1 OR author ILIKE $1 OR genre ILIKE $1"; params.push(`%${search}%`);
    }

    sql += " ORDER BY id DESC";

    const result = await pool.query(sql, params);
    const books = result.rows.map(book => ({
        ...book, id: hashids.encode(book.id)
    }));
    
    return res.status(200).json({ success: true, books });
}));


router.get("/:id", tryCatch(async (req, res) => {
    const decoded = hashids.decode(req.params.id);
    const bookId = decoded && decoded[0];

    if (!bookId) {
        return res.status(400).json({ error: "Invalid book id." });
    }

    const result = await pool.query(
        "SELECT * FROM books WHERE id = $1",
        [bookId]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({ error: "Book not found." });
    }

    const book = {
        ...result.rows[0], id: hashids.encode(result.rows[0].id)
    }

    return res.status(200).json({ success: true, book });
}));


module.exports = router;