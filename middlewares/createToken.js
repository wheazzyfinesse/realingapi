import jwt from "jsonwebtoken";
const createToken = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: 24 * 60 * 60 * 1000,
	});
	// Set the token in a cookie
	res.cookie("token", token, {
		httpOnly: true,
		sameSite: "strict",
		maxAge: 24 * 60 * 60 * 1000,
	});
	res.setHeader("Authorization", `Bearer ${token}`);
	return token;
};

export default createToken;
