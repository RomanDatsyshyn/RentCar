const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

module.exports = mongoose.model("User", userSchema);
