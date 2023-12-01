import "dotenv/config";

const dbConfig = {
  url: process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/BikePart",
};

export default dbConfig;
