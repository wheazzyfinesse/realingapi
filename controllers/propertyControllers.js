import Property from "../models/propertyModel.js";

// ADMIN CONTROLLERS=============================================
// Add Property
const addProperty = async (req, res) => {
	try {
		const propertyExists = await Property.findOne({ title: req.body.title });
		if (propertyExists) {
			return res.status(404).json(`${req.body.title} already exists`);
		} else {
			const property = await Property.create({
				...req.body,
				user: req.user._id,
			});
			return res.status(201).json(property);
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};
// Get All properties
const getProperties = async (req, res) => {
	try {
		const properties = await Property.find({}).populate("user", "-password");
		return res.status(200).json(properties);
	} catch (error) {
		return res.status(500).json(error);
	}
};
// Get property
const getProperty = async (req, res) => {
	try {
		const property = await Property.findById(req.params.id);

		return res.status(201).json(property);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
// Update property
const updateProperty = async (req, res) => {
	try {
		const property = await Property.findById(req.params.id);
		if (!property) return res.status(404).json("Property not found");
		if (!property.user.equals(req.user._id)) {
			return res
				.status(404)
				.json("You don't have authorization to update this Property");
		} else {
			const updatedProperty = await Property.findByIdAndUpdate(
				req.params.id,
				{ $set: req.body },
				{ new: true },
			);
			return res.status(200).json(updatedProperty);
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

// Delete property
const deleteProperty = async (req, res) => {
	try {
		const property = await Property.findById(req.params.id);
		if (!property) return res.status(404).json("Property not found");
		if (!property.user.equals(req.user._id)) {
			return res
				.status(404)
				.json("You don't have authorization to delete this Property");
		}
		await Property.findByIdAndDelete(req.params.id);
		return res.status(201).json("Property deleted successfully");
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

// EXPORT CONTROLLERS================================================================
export {
	addProperty,
	getProperties,
	getProperty,
	updateProperty,
	deleteProperty,
};
