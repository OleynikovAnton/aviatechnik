const database = require("../database/db");
const mailManager = require("../mail/mail-manager");

let contactManager = {
	getAll: function() {
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let messages = db.collection("messages");
					
					messages.find({}).sort({_id: -1}).toArray(function(err, items) {
						resolve(items)
						db.close();
					});
				})
		});
	},

	submit: function(message) {
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let messages = db.collection("messages");
					
					messages.insertOne(message, (err, item) => {
						db.close();
						if (err != null) {
							reject(err);
							return;
						}
						mailManager.sendMail(message)
							.then((info) => {
								resolve(info);
							})
							.catch((error) => {
								reject(error);
							})
					});
				})
		});
	}
}

module.exports = contactManager;