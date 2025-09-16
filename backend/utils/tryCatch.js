function tryCatch(handler) {
	return async (req, res, next) => {
		try {
			await handler(req, res);
		} catch (err) {
			console.error(`Error in ${req.method} ${req.originalUrl}:`, err);
			res.status(500).json({ error: "Server error" });
		}
	};
}

module.exports = tryCatch