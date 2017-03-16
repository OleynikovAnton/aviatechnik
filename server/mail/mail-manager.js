const nodemailer = require("nodemailer");

const mailConfig = require("../config/mail");

let mailManager = {
	sendMail: function(mailData) {
		return new Promise((resolve, reject) => {
			let mailTransporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: mailConfig.user,
					pass: mailConfig.password
				}
			});

			let mailOptions = {
				replyTo: `"${mailData.name}" <${mailData.email}>`,
				to: mailConfig.feedbackReceiver,
				subject: "Message from contact form",
				text: mailData.text,
			};

			mailTransporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					reject(error);
					return;
				}
				resolve(info);
			});
		});
	}
}

module.exports = mailManager;