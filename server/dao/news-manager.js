const database = require("../database/db");
const ObjectID = require("mongodb").ObjectID;
const fs = require("fs");
const path = require("path");

const storageConfig = require("../config/storage");

let newsManager = {
	getAll: function() {
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let news = db.collection("news");
					news.find({}).sort({_id: -1}).toArray(function(err, items) {
						resolve(items)
						db.close();
					});
				})
		});
	}, 

	getById: function(newsId) {
		return new Promise((resolve, reject) => {
			if (!ObjectID.isValid(newsId)) {
				reject({message: "Invalid ID"});
				return;
			}

			database.connect(reject)
				.then((db) => {
					let news = db.collection("news");
					news.findOne({_id: new ObjectID(newsId)}, (err, item) => {
						db.close();
						if (err != null) {
							reject(err);
							return;
						}
						resolve(item);
					});
				})
		});
	},

	add: function(newsData) {
		return new Promise((resolve, reject) => {
			let imagePath = null;
			if (newsData.image) {
				imagePath = "." + storageConfig.imagesPath + path.basename(newsData.image.path) + ".jpg";
				fs.rename(newsData.image.path, imagePath)
			}

			database.connect(reject)
				.then((db) => {
					let news = db.collection("news");

					let item = {
						title: newsData.title,
						content: newsData.content,
						date: new Date().toISOString(),
						image: imagePath
					}

					news.insertOne(item, (err, result) => {
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

	update: function(newsId, item) {
		return new Promise((resolve, reject) => {
			if (!ObjectID.isValid(newsId)) {
				reject({message: "Invalid ID"});
				return;
			}

			database.connect(reject)
				.then((db) => {
					let news = db.collection("news");

					let newItem = {
						_id: new ObjectID(newsId),
						title: item.title,
						content: item.content
					}

					news.update({_id: newItem._id}, {
						$set: {
							title: newItem.title,
							content: newItem.content
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

	delete: function(newsId) {
		return new Promise((resolve, reject) => {
			if (!ObjectID.isValid(newsId)) {
				reject({message: "Invalid ID"});
				return;
			}

			this.getById(newsId)
				.then((item) => {
					if (item) {
						fs.unlink(item.image);
					}
					database.connect(reject)
						.then((db) => {
							let news = db.collection("news");

							news.remove({_id: new ObjectID(newsId)}, {}, (err, result) => {
								db.close();
								if (err != null) {
									reject(err);
									return;
								}
								resolve(result);
							});
						});
				})
				.catch((error) => {
					reject(error);
				})			
		});
	}
}

module.exports = newsManager;