import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const appointmentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  selectedSlot: String,
  selectedDate: String,
  person: String,
  require: String,
  created_at: {
    default: new Date(),
    type: Date,
  },
  status: {
    default: false,
    type: Boolean,
  },
});

export default mongoose.model("Appointment", appointmentSchema);
