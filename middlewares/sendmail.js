import nodemailer from "nodemailer";

export const sendMailToAdmin = async (email, subject, message) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		auth: {
			user: "techfinesse.studio@gmail.com",
			pass: "hqzr onks syfs sped",
		},
	});
	const options = {
		from: email, // sender's email address
		to: "techfinesse.studio@gmail.com", //Admin's receiver email address
		subject: subject,
		text: message,
	};
	try {
		const response = await transporter.sendMail(options);
		console.log("Email sent successfully");
		return response;
	} catch (error) {
		console.error("Error sending email", error);
		return error;
	}
};
export const sendMailToUsers = async (email, message) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		auth: {
			user: "techfinesse.studio@gmail.com",
			pass: "hqzr onks syfs sped",
		},
	});
	const options = {
		from: "Realist Realty Realistrealty2024@gmail.com",
		to: email,
		subject: "You Made an Enquiry for a property listing",
		text: message,
	};
	try {
		const response = await transporter.sendMail(options);
		if (response.rejected.length > 0) {
			console.log("Message not sent");
		} else {
			return "Message Delivered successfully";
		}
	} catch (error) {
		console.error("Error sending email", error);
	}
};
