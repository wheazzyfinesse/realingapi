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
const Enquiries = mongoose.model("Enquiries", enquiriesSchema);
export default Enquiries;
