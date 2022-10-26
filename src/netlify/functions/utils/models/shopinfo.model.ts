import mongoose from "mongoose";
require("dotenv").config();

const Schema = mongoose.Schema;

export const shopinfoSchema = new Schema({
  company: String,
  email: String,
  password: String,
  phoneNumber: String,
  city: String,
  cityCode: String,
  street: String,
  firstName: String,
  lastName: String,
  uid: String,
  shopName: String,
  shopId: String,
  settings: {},
});

export default mongoose.model("Shopinfo", shopinfoSchema);
