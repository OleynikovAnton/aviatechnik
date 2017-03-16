const database = require("../database/db");
const ObjectID = require("mongodb").ObjectID;
const manufacturerManager = require("../dao/manufacturer-manager");
const airplanesManager = require("../dao/planes-manager");
const partsManager = require("../dao/parts-manager");

var parse = require('csv-parse');
// var xlsx = require('node-xlsx');
var XLSX = require('xlsx');
var formidable = require('formidable');
var fs = require('fs');

let importManager = {
	parse: function(req) {
		return new Promise((resolve, reject) => {
			let form = new formidable.IncomingForm()

			form.parse(req, function(err, fields, files) {
                if (!files.upload) {
                    reject({error: "No file received"});
                    return;
                }
                var workbook = XLSX.readFile(files.upload.path);
				var rows = to_csv(workbook).split('\n');
                rows.shift();
                rows.shift();
                var data = {};
                var cap_table = [];
                var manufacturersSet = new Set();
                var plainsList = [];
                var updatedAirplanesMap = [];
                var updatedManufacturersMap = [];
                var errors = [];

                for (var i = 0, rows_count = rows.length; i < rows_count; i++ ) {
                    var items = rows[i].split('","');
                    if (items[1] === '') { continue; }
                    if (cap_table.length == 0) {
                        cap_table = items;
                        //console.log(cap_table)
                        continue;
                    }

                    data[items[0]] = {};
                    for (var j = 0, items_count = items.length; j < items_count; j++) { //console.log(items[j]);
                        if(items[j].trim() === ''
                            && (cap_table[j] == 'Part Number'
                            || cap_table[j] == 'Description'
                            || cap_table[j] == 'Manufacturer')) {

                            if (items[0] != ''){
                                errors.push(items[0]);
                            }

                            j=items_count;
                            // i++;
                            continue;
                        }
                            data[items[0]][cap_table[j]] = items[j];

                        if(cap_table[j] == 'Manufacturer') {
                            manufacturersSet.add(items[j]);
                        }
                    }
                }

                plainsList = cap_table.slice(3);

                manufacturerManager.getAll()
                    .then(function(value) {
                        return manufacturerManager.insert(isNewItems(manufacturersSet, value, 'name'))
                    }).then(function () {
                        return manufacturerManager.getAll();
                    }).then(function(value) {
                        updatedManufacturersMap = makeMap(value);
                        return airplanesManager.getAll();
                    }).then(function (value) {
                        return airplanesManager.insert(isNewItems(plainsList, value, 'name'));
                    }).then(function () {
                        return airplanesManager.getAll();
                    }).then(function (value) {
                        updatedAirplanesMap = makeMap(value);
                        return partsManager.getAll()
                    }).then(function (value) {
                        return partsManager.insert(
                            NewParts(data, value, 'part_number'),
                            updatedManufacturersMap,
                            updatedAirplanesMap
                        );
                    }).then(function () {
                        return partsManager.getAll();
                    }).then(function(value){
                         console.log('parts inserted');
                         resolve(errors);
                    });



            });



			function NewParts(newArr, oldArr, uniqField) {       //TODO: merge it with isNewItems function below
				var newItems = newArr;
				oldArr.forEach(function (item) {
					delete newItems[item[uniqField]];
				});

                return newItems;
			}

			function isNewItems(newArr, oldArr, uniqField) {
				var tmp = {},
					newItems = new Set();

				newArr.forEach(function (item) {
					if(item !== ''){
						tmp[item] = 0;
					}

				});

				oldArr.forEach(function (item) {
					delete tmp[item[uniqField]];
				});

				for (key in tmp) {
					newItems.add(key);
				}

				return newItems;
			}

			function makeMap(arr) {
				var map = {};

				arr.forEach(function (item) {
					map[item['name']] = item;
                });

				return map;
            }

            function to_csv(workbook) {
                var result = [];
                workbook.SheetNames.forEach(function(sheetName) {
                    var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName], {FS:'","'});
                    if (csv.length > 0) {
                        result.push("SHEET: " + sheetName);
                        result.push("");
                        result.push(csv);
                    }
                });
                return result.join("\n");
            }






		})
	}

}

module.exports = importManager;