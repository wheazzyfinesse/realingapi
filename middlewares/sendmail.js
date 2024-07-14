import nodemailer from "nodemailer";

// Admin Mails
export const sendMailToAdmin = async (email, message, subject, username) => {
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
		subject: `Property Listing Enquiry made by ${email}`,

		html: `
				<h3>${username}</h3>
				<h1> ${subject}</h1>
                <p>${message}</p>
                <a href="https://realing.vercel.app/login">Login to view and respond to enquiry</p>
				`,
	};
	try {
		const response = await transporter.sendMail(options);
		if (response.rejected.length > 0) {
			return "Message not sent";
		} else {
			return "Delivered";
		}
	} catch (error) {
		console.error("Error sending email", error);
		return error;
	}
};

// User Mails
export const sendMailToUsers = async (email) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		auth: {
			user: "techfinesse.studio@gmail.com",
			pass: "hqzr onks syfs sped",
		},
	});
	const options = {
		from: "Realist Realty",
		to: email,
		subject: "You Made an Enquiry for a property listing",
		text: "Your enquiry about our property listing has been received we will get back to you as soon as possible, thank you",
	};
	try {
		const response = await transporter.sendMail(options);
		if (response.rejected.length > 0) {
			return "Message not sent";
		} else {
			return "Delivered";
		}
	} catch (error) {
		console.error("Error sending email", error);
		return error;
	}
};
// General Notification
export const sendMailNotification = async (
	email,
	id,
	otp,
	subject,
	message,
	type,
) => {
	console.log(id, otp);
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		auth: {
			user: "techfinesse.studio@gmail.com",
			pass: "hqzr onks syfs sped",
		},
	});

	const options = {
		from: "Realist Realty",
		to: email,
		subject: subject,
		html: `
		    <h1>${subject}</h1>
			    <p>${message}</p>
				
				${type === "register" &&
			`<a href="http://localhost:5173/verifyaccount/${id}/${otp}">
							follow the link to Verify account
						</a>`
			}
				${type === "login" &&
			`<a href="https://realing.vercel.app/profile">
							Go to your account
						</a>`
			}
				${type === "verify" &&
			`<a href="https://realing.vercel.app/login">
							Go to your account
						</a>`
			}
				`,
	};
	try {
		const response = await transporter.sendMail(options);
		if (response.rejected.length > 0) {
			return "Message not sent";
		} else {
			return "Delivered";
		}
	} catch (error) {
		console.error("Error sending email", error);
		return error;
	}
};

// Otp Mails
export const sendMailOtp = async (email, id, otp, message, subject) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		auth: {
			user: "techfinesse.studio@gmail.com",
			pass: "hqzr onks syfs sped",
		},
	});
	const options = {
		from: "techfinesse.studio@gmail.com", //Admin's receiver email address
		to: email, // sender's email address
		subject: `Your Requested One Time Password is: ${otp}`,

		html: `
				<h1> ${subject}</h1>
				<h3> ${message}</h3>
                <p>Your Requested One Time Password is: ${otp}</p>
                <a href="http://localhost:5173/verifyaccount/${id}/${otp}">
							follow the link to Verify account
						</a>
				`,
	};
	try {
		const response = await transporter.sendMail(options);
		if (response.rejected.length > 0) {
			return "Message not sent";
		} else {
			return "Delivered";
		}
	} catch (error) {
		console.error("Error sending email", error);
		return error;
	}
};
