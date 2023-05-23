const router = require("express").Router();

router.get("/", (req, res, next) => {
	res.send("rubberduck route");
});
module.exports = router;
