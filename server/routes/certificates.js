const certificatesManager = require("../dao/certificates-manager");
const formidable = require("formidable");
const forbidden = require("../util/forbidden");
const httpResponse = require("../util/http-response");

const storageConfig = require("../config/storage");

function configure(router) {
	router.route("/certificates")
		.get((req, res) => {
			httpResponse(certificatesManager.getAll(), res, httpResponse.arrayTransform);
		})
		.post((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}

			let form = new formidable.IncomingForm();
			form.uploadDir = "." + storageConfig.tmpPath;
			form.parse(req, (err, fields, files) => {
				httpResponse(certificatesManager.add(fields.title, files.certFile), res);
			});
		});

	router.route("/certificates/:cert_id")
		.put((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}
			
			let item = req.body;
			httpResponse(certificatesManager.update(req.params.cert_id, item), res);
		})
		.delete((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}
			
			httpResponse(certificatesManager.delete(req.params.cert_id), res);
		});
}

module.exports.configure = configure;