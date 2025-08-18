import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    description: String,
    points: Number,
    group: String,
    display_grade_as: String,
    submission_type: String,
    due_date: String,
    available_from: String,
    available_until: String,
    assign_to: String,
  },
  { collection: "assignments" }
);
export default assignmentSchema;