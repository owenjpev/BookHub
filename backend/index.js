require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(session({
	store: new pgSession({ pool: pool, tableName: "user_sessions" }),
	secret: process.env.SESSION_SECRET || "abc123",
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

fs.readdirSync("./routes").forEach(file => {
	const route = require(`./routes/${file}`);
	const routeName = path.basename(file, ".js");
	console.log(`Loading route: /api/${routeName}`);
	app.use(`/api/${routeName}`, route);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});