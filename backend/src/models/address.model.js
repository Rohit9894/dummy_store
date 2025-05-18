import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: {
    type: String,
    required: true,
  },
  country: String,
  addressType: [office, Home],
});

export const Address =
  mongoose.models?.Address || mongoose.model("Address", addressSchema);
