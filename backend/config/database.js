const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Synced Successfully!!!");
    })
    .catch((error) => {
      console.log("~~~Database Sync Failed");
      console.log(error);
    });
};

module.exports = connectDatabase;
