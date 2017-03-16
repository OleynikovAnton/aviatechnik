const database = require("../database/db");
const ObjectID = require("mongodb").ObjectID;

let partsManager = {
	getAll: function(params = {}) {
		return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let parts = db.collection("parts");

                    let query = {};
                    let airplaneQuery = {};
                    let manufacturerQuery = {};
                    let partQuery = {};

                    if (params.airplane_id) {
                        airplaneQuery = {
                            airplanes_ids: { 
                                $elemMatch: { $eq: new ObjectID(params.airplane_id) }
                            }
                        }
                    }
                    if (params.manufacturer_id) {
                        manufacturerQuery = {
                            manufacturer_id: {
                                $eq: new ObjectID(params.manufacturer_id)
                            }
                        }
                    }
                    if (params.part_number) {
                        partQuery = {
                            part_number: {
                                $eq: params.part_number
                            }
                        }
                    }

                    query = Object.assign(airplaneQuery, manufacturerQuery, partQuery);

        			parts.find(query)
                        .limit((params.count) ? params.count : 0)
                        .skip((params.from) ? params.from : 0)
    					.toArray(function(err, items) {
    						resolve(items)
    						db.close();
    					});
				})
		});
	},


    insert: function (items, manufacturers, airplanes) {
        return new Promise((resolve, reject) => {
			database.connect(reject)
				.then((db) => {
					let parts = db.collection("parts");
					var data = [];
        			var part = {};

					for (key in items){

                        var airplanes_ids = [];


                        for (var detail in items[key]) {
                            if(detail != 'Part Number' && detail != 'Description' && detail != 'Manufacturer' && items[key][detail] != ''){
                                airplanes_ids.push(airplanes[detail]['_id']);
                            } else {

							}
                        }

                        if (!manufacturers[items[key]['Manufacturer']]) {
                        	continue;
                        }

                        // var manufacturer = manufacturers[items[key]['Manufacturer']];

                        if(items[key] !== '') {
                            part = {
								part_number: items[key]['Part Number'],
								description: items[key]['Description'],
								manufacturer_id: manufacturers[items[key]['Manufacturer']]['_id'],
								airplanes_ids: airplanes_ids
                            };

                             data.push(part);
                        }
					}

					//console.log(data);

                    if(data.length < 1) {
                        resolve();
                        return
                    } else {
                        parts.insertMany(data, (err, item) => {
                        	db.close();

                        	if (err != null) {
                        			reject(err);
                        			return;
                        	}

                        	resolve();
                        	return;
                        });
					}
				})
		});
    },

    drop: function() {
        return new Promise((resolve, reject) => {
            database.connect(reject)
            .then((db) => {
                db.collection("parts").remove({});
			})
		});
    },
}

module.exports = partsManager;