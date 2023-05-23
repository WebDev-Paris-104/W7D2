// require('dotenv/config')
require("dotenv").config();
// Connect to the database
require("./config/dbConfig");
// We need express
const express = require("express");
// Need the app
const app = express();
// Configuration of the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Quick example of middlewares
 */
// app.use(logger);

// app.get("/", (req, res, next) => {
// 	res.json(req.cat);
// });

// app.get("/test", modifytheRequest, (req, res, next) => {
// 	res.json(req.cat);
// });

// Here we are importing the index router
// All the request are handled in the subsequent routes
app.use("/api", require("./routes/index.routes"));

app.listen(process.env.PORT, () =>
	console.log(`Server running on http://localhost:${process.env.PORT}`)
);

app.use("*", (req, res, next) => {
	res.json({ message: "That's a 404 right here..." });
});

app.use((err, req, res, next) => {
	console.log(err.message);
	res.json({ error: err, message: err.message });
});

// function modifytheRequest(req, res, next) {
// 	req.cat = { name: "Illiu" };
// 	next();
// }

// function logger(req, res, next) {
// 	console.log(`Making a request on ${req.path}`);
// 	next();
// }
