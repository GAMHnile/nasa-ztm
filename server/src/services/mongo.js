const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-api:DhlZSuzirM8Nm5QF@cluster-nasa-api.4i9o6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("mongodb connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function connectMongoose() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
}

async function disconnectMongoose() {
  await mongoose.disconnect();
}

module.exports = {
  connectMongoose,
  disconnectMongoose,
};
