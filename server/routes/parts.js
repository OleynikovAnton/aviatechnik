const planesManager = require("../dao/planes-manager");
const manufacturersManager = require("../dao/manufacturer-manager");
const partsManager = require("../dao/parts-manager");
const forbidden = require("../util/forbidden");
const httpResponse = require("../util/http-response");

function configure(router) {
	router.route("/parts/airplanes")
		.get((req, res) => {
			httpResponse(planesManager.getAll(), res, httpResponse.arrayTransform);
		});

	router.route("/parts/airplanes/:plane_id/manufacturers")
		.get((req, res) => {
			httpResponse(manufacturersManager.getByAirplaneId(req.params.plane_id), res, httpResponse.arrayTransform);
		});

	router.route("/parts/manufacturers")
		.get((req, res) => {
			httpResponse(manufacturersManager.getAll(), res, httpResponse.arrayTransform);
		});

	router.route("/parts/search")
		.post((req, res) => {
			let params = req.body;

			httpResponse(partsManager.getAll(params), res, httpResponse.arrayTransform);
		});
}

module.exports.configure = configure;