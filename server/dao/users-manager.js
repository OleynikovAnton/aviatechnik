const database = require("../database/db");
const ObjectID = require("mongodb").ObjectID;
const sha256 = require("sha256");

let usersManager = {
	getByToken: function(token) {
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let users = db.collection("users");
					users.findOne({ token: token }, (err, user) => {
						db.close();
						if (user == null) {
							user = {
								is_admin: false
							}
						}
						resolve(user);
					});
				})
		});
	},

	getByEmail: function(email) {
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let users = db.collection("users");
					users.findOne({ email: email }, (err, user) => {
						db.close();
						if (err != null) {
							reject(err);
							return;
						}
						resolve(user);
					});
				})
		});
	},

	getAll: function() { 
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {	
					let users = db.collection("users");
					users.find({}).sort({_id: -1}).toArray((err, items) => {
						resolve(items.map((user) => ({
							_id: user._id,
							full_name: user.full_name,
							email: user.email,
							is_admin: user.is_admin
						})))
						db.close();
					});
				})
		});
	},

	signup: function(userData) {
		return new Promise((resolve, reject) => {
			this.getByEmail(userData.email)
				.then((existingUser) => {
					if (existingUser != null) {
						reject({error: "Email already registred"});
						return;
					}

					let salt = Date.now();
					let user = {
						full_name: userData.full_name,
						email: userData.email,
						is_admin: true,
						token: sha256(userData.password + salt),
						salt: salt
					}
					database.connect(reject)
						.then((db) => {
							let users = db.collection("users");

							users.insertOne(user, (err, result) => {
								db.close();
								if (err != null) {
									reject(err);
									return;
								}
								resolve(result);
							});
						})
				})
				.catch((error) => {
					reject(error);
				})
		});
	},

	login: function(email, password) {
		return new Promise((resolve, reject) => {
			this.getByEmail(email)
				.then((user) => {
					if (user == null || sha256(password + user.salt) != user.token) {
						reject({error: "Wrong login data"});
						return;
					}
					resolve(user);
				})
				.catch((error) => {
					reject(error);
				})
		});
	},

	delete: function(userId) {
		return new Promise((resolve, reject) => {
			if (!ObjectID.isValid(userId)) {
				reject({message: "Invalid ID"});
				return;
			}

			database.connect(reject)
				.then((db) => {
					let users = db.collection("users");

					users.remove({_id: new ObjectID(userId)}, {}, (err, result) => {
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

	update: function(userId, item) {
		return new Promise((resolve, reject) => {
			if (!ObjectID.isValid(userId)) {
				reject({message: "Invalid ID"});
				return;
			}

			database.connect(reject)
				.then((db) => {
					let users = db.collection("users");

					users.update({_id: new ObjectID(userId)}, {
						$set: {
							full_name: item.full_name,
							email: item.email
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
	}
}

module.exports = usersManager;