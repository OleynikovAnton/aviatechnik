const contactManager = require("../dao/contact-manager");
const forbidden = require("../util/forbidden");
const httpResponse = require("../util/http-response");

function configure(router) {
	router.route("/contact")
		.get((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}
			
			httpResponse(contactManager.getAll(), res, httpResponse.arrayTransform);
		})
		.post((req, res) => {
			let message = req.body;
			httpResponse(contactManager.submit(message), res);
		});
}

module.exports.configure = configure;