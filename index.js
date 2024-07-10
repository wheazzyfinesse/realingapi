// NPM MODULES============================================================
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// CUSTOM MODULES============================================================
import userRoutes from "./routes/userRoutes.js";
import propertiesRoutes from "./routes/propertiesRoutes.js";
import enquiriesRoutes from "./routes/enquiriesRoutes.js";

// NPM MIDDLEWARES================================================================
dotenv.config();
const app = express();

// Define allowed origins
const allowedOrigins = ["https://realing.vercel.app"];

app.use(
	cors({
		origin: function (origin, callback) {
			// Allow requests with no origin (like mobile apps, curl requests)
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				const msg =
					"The CORS policy for this site does not allow access from the specified Origin.";
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
		credentials: true, // Allow cookies and other credentials
	}),
);
app.use(cookieParser());
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
