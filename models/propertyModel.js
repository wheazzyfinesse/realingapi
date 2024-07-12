import mongoose from "mongoose";

const propertiesSchema = mongoose.Schema(
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
		enquiries: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Enquiries",
				},
			],
			default: [],
		},
		numEnquiries: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

const Properties = mongoose.model("Properties", propertiesSchema);
export default Properties;
