const pagesManager = require("../dao/pages-manager");
const forbidden = require("../util/forbidden");
const httpResponse = require("../util/http-response");

function configure(router) {
	router.route("/pages")
		.get((req, res) => {
			httpResponse(pagesManager.getAll(), res, httpResponse.arrayTransform);
		})
		.post((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}

			let pageData = req.body;
			httpResponse(pagesManager.add(pageData), res);
		});
	router.route("/pages/:page_name")
		.get((req, res) => {
			httpResponse(pagesManager.getByName(req.params.page_name), res);
		})
		.put((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}
			let pageData = req.body;
			httpResponse(pagesManager.update(req.params.page_name, pageData), res);
		})
		.delete((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}

			httpResponse(pagesManager.delete(req.params.page_name), res);
		});
}

module.exports.configure = configure;