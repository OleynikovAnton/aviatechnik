const database = require("../database/db");
const ObjectID = require("mongodb").ObjectID;

let airplaneManager = {
	getAll: function() {
		return new Promise((resolve, reject) => {
			database.connect()
				.then((db) => {
					let airplanes = db.collection("airplanes");
        			airplanes.find({}
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


    insert: function (items) {                // takes value of type Set
        return new Promise((resolve, reject) => {
			database.connect()
				.then((db) => {
					let airplanes = db.collection("airplanes");
					var data = [];
        			var plane = {};

        			items.forEach(function (item) {

					 	if(item !== '') {
                            plane = {
                                 name: item
                             };

                             data.push(plane);
						}
                    });

        			if(data.length < 1) {
                        resolve();
                        return
                    } else {
                        airplanes.insertMany(data, (err, item) => {
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
                db.collection("airplanes").remove({});

				})

		});
    },
}

module.exports = airplaneManager;