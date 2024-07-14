import mongoose from "mongoose";

const userPropertiesSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: "",
		},
		phone: {
			type: String,
			default: "",
		},
		address: {
			type: String,
			default: "",
		},
		city: {
			type: String,
			default: "",
		},
		state: {
			type: String,
			default: "",
		},
		zip: {
			type: String,
			default: "",
		},
		country: {
			type: String,
			default: "",
		},
		enquiries: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Property",
				},
			],
			default: [],
		},
		otp: {
			type: String,
			default: "",
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);
const UserProperties = mongoose.model("UserProperties", userPropertiesSchema);
export default UserProperties;
