const database = require("../database/db");
const ObjectID = require("mongodb").ObjectID;

let careersManager = {
	getActual: function() {
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let careers = db.collection("careers");
					careers.find({
						exp_date: {
							$gte: new Date().toISOString()
						}
					}).sort({_id: -1}).toArray(function(err, items) {
						resolve(items)
						db.close();
					});
				})
		});
	}, 

	getById: function(careerId) {
		return new Promise((resolve, reject) => {
			if (!ObjectID.isValid(careerId)) {
				reject({message: "Invalid ID"});
				return;
			}

			database.connect(reject)
				.then((db) => {
					let careers = db.collection("careers");
					careers.findOne({_id: new ObjectID(careerId)}, (err, item) => {
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

	add: function(item) {
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let careers = db.collection("careers");

					let career = {
						title: item.title,
						description: item.description,
						exp_date: item.exp_date
					}

					careers.insertOne(career, (err, item) => {
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

	update: function(careerId, item) {
		return new Promise((resolve, reject) => {
			if (!ObjectID.isValid(newsId)) {
				reject({message: "Invalid ID"});
				return;
			}
			
			database.connect(reject)
				.then((db) => {
					let careers = db.collection("careers");

					let career = {
						_id: new ObjectID(careerId),
						title: item.title,
						description: item.description,
						exp_date: item.exp_date
					}

					careers.save(career, (err, item) => {
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

	delete: function(careerId) {
		return new Promise((resolve, reject) => {
			if (!ObjectID.isValid(careerId)) {
				reject({message: "Invalid ID"});
				return;
			}
			
			database.connect(reject)
				.then((db) => {
					let careers = db.collection("careers");

					careers.remove({_id: new ObjectID(careerId)}, {}, (err, result) => {
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

module.exports = careersManager;