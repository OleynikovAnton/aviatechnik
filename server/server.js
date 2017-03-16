const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const usersManager = require("./dao/users-manager");
const storageConfig = require("./config/storage");

const port = process.env.PORT || 3000;

let app = express();
app.use(bodyParser.json());

app.use('/api', function(req, res, next) {
	usersManager.getByToken(req.headers["x-auth-token"])
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((error) => {
			res.status(500);
			res.json(error);
		})
});
app.use("/api", router);

var cors = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Auth-Token, Content-Type, User-Agent, X-Requested-With, Cache-Control");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "*");
	next();
};
router.use(cors);

app.use(storageConfig.certificatesPath, express.static(__dirname + storageConfig.certificatesPath));
app.use(storageConfig.imagesPath, express.static(__dirname + storageConfig.imagesPath));

var errorHandler = function (err, req, res, next) {
	res.status(400);
	res.json({message: "Cant process request", error: err});
};
app.use("/api", errorHandler);

const careersRoutes = require("./routes/careers");
careersRoutes.configure(router);

const certificatesRoutes = require("./routes/certificates");
certificatesRoutes.configure(router);

const importcsvRoutes = require("./routes/importcsv");
importcsvRoutes.configure(router);

const contactRoutes = require("./routes/contact");
contactRoutes.configure(router);

const newsRoutes = require("./routes/news");
newsRoutes.configure(router);

const usersRoutes = require("./routes/users");
usersRoutes.configure(router);

const pagesRoutes = require("./routes/pages");
pagesRoutes.configure(router);

const partsRoutes = require("./routes/parts");
partsRoutes.configure(router);

app.listen(port);
console.log(`Server is listening on port ${port}`);