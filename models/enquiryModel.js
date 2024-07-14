import mongoose from "mongoose";

const enquiriesSchema = mongoose.Schema(
	{
		subject: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "UserProperties",
			required: true,
		},
		property: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Properties",
			required: true,
		},
	},
	{ timestamps: true },
);
const anonEnquiriesSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);
const AnonEnquiries = mongoose.model("AnonEnquiries", anonEnquiriesSchema);
const Enquiries = mongoose.model("Enquiries", enquiriesSchema);
export { Enquiries, AnonEnquiries };
