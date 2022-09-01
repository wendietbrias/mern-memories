const mongoose = require("mongoose");

const connectDB = async (app) => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGO_URI}`);
    if (connect) {
      return app.listen(`${process.env.PORT}`, () =>
        console.log(`run on port : ${process.env.PORT}`)
      );
    }
  } catch (err) {
    return err;
  }
};

module.exports = connectDB;
