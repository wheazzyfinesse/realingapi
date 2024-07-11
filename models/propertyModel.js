import mongoose from "mongoose";

const enquirySchema = mongoose.Schema(
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
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true },
);

const propertySchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "UserProperties",
			required: true,
		},
		title: {
			type: String,
			required: true,
			unique: true,
		},
		// image: {
		// 	type: String,
		// 	required: true,
		// },
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		bedrooms: {
			type: Number,
			required: true,
			min: 1,
		},
		bathrooms: {
			type: Number,
			required: true,
			min: 1,
		},
		description: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		squaremeters: {
			type: Number,
			required: true,
		},

		enquiries: [enquirySchema],
		numEnquiries: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);
const Property = mongoose.model("Property", propertySchema);
export default Property;
