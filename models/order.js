const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car"
  },
  price: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    minlength: 5
  },
  isCompleted: {
    type: Boolean,
    required: true
  }
});

orderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Order", orderSchema);
