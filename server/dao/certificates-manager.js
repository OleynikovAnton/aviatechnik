const database = require("../database/db");
const ObjectID = require("mongodb").ObjectID;
const fs = require("fs");

const storageConfig = require("../config/storage");

let certificatesManager = {
	getAll: function() {
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let certificates = db.collection("certificates");
					certificates.find({}).sort({_id: -1}).toArray(function(err, items) {
						resolve(items)
						db.close();
					});
				})
		});
	},

	add: function(title, file) {
		return new Promise((resolve, reject) => {
			let filePath = "." + storageConfig.certificatesPath + file.name;
			fs.rename(file.path, filePath, (err) => { 
				if (err != null) {
					reject(err);
					return;
				}
				database.connect(reject)
					.then((db) => {
						let certificates = db.collection("certificates");

						let certificate = {
							title: title,
							path: filePath
						}

						certificates.insertOne(certificate, (err, item) => {
							db.close();
							if (err != null) {
								reject(err);
								return;
							}
							resolve(item);
						});
					})
			});
		});
	},

	update: function(certId, item) {
		return new Promise((resolve, reject) => {
			if (!ObjectID.isValid(certId)) {
				reject({message: "Invalid ID"});
				return;
			}

			database.connect(reject)
				.then((db) => {
					console.log(item)
					let certificates = db.collection("certificates");

					let certificate = {
						_id: new ObjectID(certId),
						title: item.title
					}

					certificates.update({_id: certificate._id}, {
						$set: {
							title: certificate.title
						}
					}, (err, item) => {
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

	delete: function(certId) {
		return new Promise((resolve, reject) => {
			if (!ObjectID.isValid(certId)) {
				reject({message: "Invalid ID"});
				return;
			}

			database.connect(reject)
				.then((db) => {
					let certificates = db.collection("certificates");

					certificates.findOne({_id: new ObjectID(certId)}, (err, item) => {
						if (item) {
							fs.unlink(item.path);
						}
						certificates.remove({_id: new ObjectID(certId)}, {}, (err, result) => {
							db.close();
							if (err != null) {
								reject(err);
								return;
							}
							resolve(result);
						});
					});
				})
		});
	}
}

module.exports = certificatesManager;