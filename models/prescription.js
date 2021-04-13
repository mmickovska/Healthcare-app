const mongoose = require("mongoose");

const prescriptionSchema = mongoose.Schema({
  drug_name: {
    type: String,
    require: ["Drug name is required field"],
  },
  diagnose: {
    type: String,
    require: ["Age is required field"],
  },
  date: {
    type: Date,
  },
  doctor: {
    type: mongoose.Types.ObjectId,
    ref: "Doctor",
  },
  patient: {
    type: mongoose.Types.ObjectId,
    ref: "Patient",
  },
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
