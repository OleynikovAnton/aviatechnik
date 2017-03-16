const MongoClient = require("mongodb").MongoClient;

const dbConfig = require("../config/database");

let database = {
	connect: function(onError = null) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(dbConfig.url)
				.then((db) => {
					resolve(db);
				})
				.catch((error) => {
					if (onError) {
						onError(error);
					} else {
						reject(error);
					}
				})
		});
	}
}

module.exports = database;