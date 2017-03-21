const usersManager = require("../dao/users-manager");
const forbidden = require("../util/forbidden");
const httpResponse = require("../util/http-response");
const rootAdmin = require("../config/root-admin");

function configure(router) {
	router.route("/users")
		.get((req, res) => {
			if (!req.user.is_admin) { 
				forbidden(res);
				return;
			}

			httpResponse(usersManager.getAll(), res, httpResponse.arrayTransform);
		})
		.post((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			}

			let signupData = req.body;
			httpResponse(usersManager.signup(signupData), res);
		});

	router.route("/login")
		.post((req, res) => {
			let loginData = req.body;
			httpResponse(usersManager.login(loginData.email, loginData.password), res);
		});

	router.route("/users/:user_id")
		.delete((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			} else if (req.params.user_id == req.user._id) {
				forbidden(res, "You can't delete your own profile");
				return;
			} else if (req.params.user_id == rootAdmin.id) {
				forbidden(res, "You can't delete Root Admin");
				return;
			}

			httpResponse(usersManager.delete(req.params.user_id), res);
		})
		.put((req, res) => {
			if (!req.user.is_admin) {
				forbidden(res);
				return;
			} else if (req.params.user_id == rootAdmin.id) {
				forbidden(res, "You can't edit Root Admin");
				return;
			}

			let userData = req.body;
			httpResponse(usersManager.update(req.params.user_id, userData), res);
		})
}

module.exports.configure = configure;