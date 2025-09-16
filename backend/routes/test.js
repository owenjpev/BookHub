const { createRouter, pool, tryCatch, hashids } = require("../utils/core");
const { requireLogin } = require("../middleware/auth")
const router = createRouter();

router.get("/", requireLogin, tryCatch(async (req, res) => {
    console.log(req.session.user_id)
}));

module.exports = router;