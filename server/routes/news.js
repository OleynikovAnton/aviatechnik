const newsManager = require("../dao/news-manager");
const formidable = require("formidable");
const forbidden = require("../util/forbidden");
const httpResponse = require("../util/http-response");

const storageConfig = require("../config/storage");

function configure(router) {
	router.route("/news")
		.get((req, res) => {
			httpResponse(newsManager.getAll(), res, httpResponse.arrayTransform);
		})
		.post((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}
			
			let form = new formidable.IncomingForm();
			form.uploadDir = "." + storageConfig.tmpPath;
			form.parse(req, (err, fields, files) => {
				let newsData = {
					title: fields.title,
					content: fields.content,
					image: files.image
				}

				httpResponse(newsManager.add(newsData), res);
			});
		});

	router.route("/news/:news_id")
		.get((req, res) => {
			httpResponse(newsManager.getById(req.params.news_id), res);
		})
		.put((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}
			
			let item = req.body;
			httpResponse(newsManager.update(req.params.news_id, req.body), res);
		})
		.delete((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}
			
			httpResponse(newsManager.delete(req.params.news_id), res);
		});
}

module.exports.configure = configure;