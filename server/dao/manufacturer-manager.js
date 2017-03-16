const database = require("../database/db");
const partsManager = require("../dao/parts-manager");
const ObjectID = require("mongodb").ObjectID;

let manufacturerManager = {
	getAll: function() {
		return new Promise((resolve, reject) => {
			database.connect()
				.then((db) => {
					let manufacturers = db.collection("manufacturers");
        			manufacturers.find({}
					).toArray(function(err, items) {
						resolve(items)
						db.close();
					});
				})
				.catch((error) => {
					db.close();
				})
		});
	},

	getByAirplaneId: function(airplaneId) {
		return new Promise((resolve, reject) => {
			if (!ObjectID.isValid(airplaneId)) {
				reject({message: "Invalid ID"});
				return;
			}

			partsManager.getAll({airplane_id: airplaneId})
				.then((parts) => {
					let manufacturersIds = parts.reduce((idsSet, part) => {
						return idsSet.add(new ObjectID(part.manufacturer_id.toString()));
					}, new Set());

					manufacturersIds = Array.from(manufacturersIds);

					database.connect()
						.then((db) => {
							let manufacturers = db.collection("manufacturers");

							manufacturers.find({_id: {$in: manufacturersIds}})
								.toArray(function(err, items) {
									resolve(items)
									db.close();
								});
						})
				});
		});
	},

    insert: function (items) {                // takes value of type Set
        return new Promise((resolve, reject) => {
			database.connect()
				.then((db) => {
					let manufacturers = db.collection("manufacturers");
					var data = [];
        			var manufacturer = {};

        			items.forEach(function (item) {

					 	if(item !== '') {
                             manufacturer = {
                                 name: item
                             };

                             data.push(manufacturer);
						}
                    });

        			if(data.length < 1) {
                        resolve();
					} else {
                        manufacturers.insertMany(data, (err, item) => {
                        	db.close();

                        	if (err != null) {
                        			reject(err);
                        			return;
                        	}
                        	resolve(item);
                        });
					}
				})
				.catch((error) => {
					db.close();
			})
		});
    },

    drop: function() {
        return new Promise((resolve, reject) => {
                database.connect()
                .then((db) => {
                db.collection("manufacturers").remove({});

				})

		});
    },
}

module.exports = manufacturerManager;