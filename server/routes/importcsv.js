const importManager = require("../dao/import-manager");
const httpResponse = require("../util/http-response");
const forbidden = require("../util/forbidden");

function configure(router) {

    router.route('/upload-xls')
        .post(function (req, res) {
            if (!req.user.is_admin) {
                forbidden(res);
                return;
            }

            httpResponse(importManager.parse(req), res, httpResponse.arrayTransform);
        })

        .get(function (req, res) {
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(
                '<form action="/api/upload-xls" enctype="multipart/form-data" method="post">' +
                '<input type="text" name="title"><br>' +
                '<input type="file" name="upload" multiple="multiple"><br>' +
                '<input type="submit" value="Upload">' +
                '</form>'
        );
    });
}

module.exports.configure = configure;