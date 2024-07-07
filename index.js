// NPM MODULES============================================================
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// CUSTOM MODULES============================================================
import userRoutes from "./routes/userRoutes.js";
import propertiesRoutes from "./routes/propertiesRoutes.js";
import enquiriesRoutes from "./routes/enquiriesRoutes.js";

// NPM MIDDLEWARES================================================================
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CUSTOM MIDDLEWARES===============================================================
app.use("/api/user", userRoutes);
app.use("/api/properties", propertiesRoutes);
app.use("/api/enquiries", enquiriesRoutes);

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log(`successfully connected to mongoDB 😁👍✅`);
	} catch (error) {
		console.error(`ERROR:${error.message}`);
		process.exit(1);
	}
};
connectDB();
app.listen(process.env.PORT || 5000, () => {
	console.log("Listenning on port " + process.env.PORT);
});
