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
const allowedOrigins = ["https://realing.vercel.app", "http://localhost:5173"];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	}),
);
// const corsOptions = {
// 	origin: ["http://localhost:5173", "https://realing.vercel.app"],
// 	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// 	credentials: true,
// 	optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));

app.options("*", cors()); // Pre-flight handling

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
