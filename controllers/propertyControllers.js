import Property from "../models/propertyModel.js";

// ADMIN CONTROLLERS=============================================
// Add Property
const addProperty = async (req, res) => {
	try {
		const newProperty = await Property.create({
			...req.body,
			user: req.user._id,
		});
		return res.status(201).json(newProperty);
	} catch (error) {
		return res.status(500).json({ message: "Failed to add property" });
	}
};
// Get All properties
const getAllProperties = async (req, res) => {
	try {
		const properties = await Property.find({});
		return res.status(200).json(properties);
	} catch (error) {
		return res.status(500).json(error.message);
	}
};
// Get property
const getProperty = async (req, res) => {
	try {
		const property = await Property.findById(req.params.id);
		if (!property) {
			throw new Error("Property not found");
		} else {
			return res.status(200).json(property);
		}
	} catch (error) {
		return res.status(500).json(error.message);
	}
};
// Update property
const updateProperty = async (req, res) => {
	try {
		const property = await Property.findById(req.params.id);

		if (!property || property.user !== req.user._id) {
			throw new Error("Property not found");
		} else {
			const updatedProperty = await Property.findByIdAndUpdate(
				req.params.id,
				{ $set: req.body },
				{ new: true },
			);
			return res.status(200).json(updatedProperty);
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

// Delete property
const deleteProperty = async (req, res) => {
	try {
		const property = await Property.findById(req.params.id);

		if (!property || property.user !== req.user._id) {
			throw new Error("Property not found");
		} else {
			await Property.findByIdAndDelete(req.params.id);
			return res.status(201).json("Property deleted successfully");
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

// EXPORT CONTROLLERS================================================================
export {
	addProperty,
	getAllProperties,
	getProperty,
	updateProperty,
	deleteProperty,
};
