module.exports = function(promise, res, responseTransform = ((x) => x)) {
	promise
		.then((response) => {
			res.json(responseTransform(response));
		})
		.catch((error) => {
			res.status(400);
			res.json(error);
		})
}

module.exports.arrayTransform = function(items) { 
	return { 
		count: items.length, 
		items: items
	}
}