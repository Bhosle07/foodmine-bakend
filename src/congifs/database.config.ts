// import mongoose, { ConnectOptions } from "mongoose";

// export const dbConnect = async () => {
//     try {
//         const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/FOODMINE";
        
//         const mongoOptions: ConnectOptions = {
//             // If you're using older Mongoose versions, you may want to enable these options
//             // useNewUrlParser: true,
//             // useUnifiedTopology: true,
//         };

//         // Connect to MongoDB
//         await mongoose.connect(mongoURI, mongoOptions);

//         // Event listeners for connection events
//         mongoose.connection.on("error", (err) => {
//             console.error("MongoDB connection error:", err);
//         });

//         mongoose.connection.once("open", () => {
//             console.log("Connected to MongoDB");

//             // Log when server starts after connection is established
//             console.log("Server has started successfully.");
//         });
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// };


import mongoose from "mongoose";

export const dbConnect = async () => {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/FOODMINE";

    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
