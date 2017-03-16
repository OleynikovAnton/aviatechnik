module.exports = function(res, message = "Forbidden") {
	res.status(403);
	res.json({error: message});
}