const careersManager = require("../dao/careers-manager");
const forbidden = require("../util/forbidden");
const httpResponse = require("../util/http-response");

function configure(router) {
	router.route("/careers")
		.get((req, res) => {
			httpResponse(careersManager.getActual(), res, httpResponse.arrayTransform);
		})
		.post((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}

			let item = req.body;
			httpResponse(careersManager.add(item), res);
		});

	router.route("/careers/:career_id")
		.get((req, res) => {
			httpResponse(careersManager.getById(req.params.career_id), res);
		})
		.put((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}
			
			let item = req.body;
			httpResponse(careersManager.update(req.params.career_id, req.body), res);
		})
		.delete((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}
			
			httpResponse(careersManager.delete(req.params.career_id), res);
		});
}

module.exports.configure = configure;