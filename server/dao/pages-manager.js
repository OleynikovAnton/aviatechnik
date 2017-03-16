const database = require("../database/db");
const ObjectID = require("mongodb").ObjectID;

let pagesManager = {
	getAll: function() {
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let pages = db.collection("pages");

					pages
						.find({})
						.sort({_id: -1})
						.toArray(function(err, items) {
							resolve(items.map((item) => ({
								_id: item._id,
								name: item.name,
								title: item.title
							})));
							db.close();
						});
				})
		});
	},

	getByName: function(name) {
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let pages = db.collection("pages");

					pages
						.findOne({name: name}, function(err, item) {
							resolve(item);
							db.close();
						});
				})
		});
	},

	add: function(pageData) {
		return new Promise((resolve, reject) => {
			function getSlug(title)	{
				return title
					.toLowerCase()
					.replace(/[^\w ]+/g,'')
					.replace(/ +/g,'-');
			}

			let page = {
				title: pageData.title,
				name: (pageData.name) ? pageData.name : getSlug(pageData.title),
				content: pageData.content
			}

			this.getByName(page.name)
				.then((existingPage) => {
					if (existingPage != null) {
						reject({error: `Page "${page.name}" is already exists`});
						return;
					}

					database.connect(reject)
						.then((db) => {
							let pages = db.collection("pages");

							pages.insertOne(page, (err, result) => {
								db.close();
								if (err != null) {
									reject(err);
									return;
								}
								resolve(result);
							});
						})
				});
		});
	},

	update: function(pageName, pageData) {
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let pages = db.collection("pages");

					pages.update({name: pageName}, {
						$set: {
							title: pageData.title,
							content: pageData.content
						}
					}, (err, result) => {
						db.close();
						if (err != null) {
							reject(err);
							return;
						}
						resolve(result);
					});
				})
		});
	},

	delete: function(pageName) {
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let pages = db.collection("pages");

					pages.remove({name: pageName}, {}, (err, result) => {
						db.close();
						if (err != null) {
							reject(err);
							return;
						}
						resolve(result);
					});
				})
		});
	}
}

module.exports = pagesManager;