import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ROLE = {
  MANAGER: "MANAGER",
  EMPLOYEE: "EMPLOYEE",
  CHEF: "CHEF",
} as const;

export type TROLE = keyof typeof ROLE;

export interface IEmployee {
  name: string;
  email: string;
  address: string;
  role: TROLE[];
}

export const employeeSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  address: String,
  role: [{ type: String, default: ROLE.VERKÄUFER }],
  createdDate: { type: Date, default: Date.now },
});

export default mongoose.model("Employee", employeeSchema);
