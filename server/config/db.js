const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Log the MongoDB URI to ensure it is loaded
    console.log("MongoDB URI:", process.env.MONGO_URI);

    if (!process.env.MONGO_URI) {
      console.error("MongoDB URI is missing in .env file");
      process.exit(1);  // Exit the app if no MongoDB URI is provided
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      reconnectTries: Number.MAX_VALUE,  // Keep trying to reconnect forever
      reconnectInterval: 500,  // Reconnect every 500ms
      poolSize: 10,  // Number of connections
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);  // Exit the app on failure
  }
};

// Monitor MongoDB Connection Events
mongoose.connection.on('error', (err) => {
  console.log(`MongoDB connection error: ${err}`);
});
mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = connectDB;