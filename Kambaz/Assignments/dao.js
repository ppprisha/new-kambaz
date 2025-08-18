import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findAllAssignments = () => model.find();

export const findAssignmentById = (assignmentId) =>
  model.findById(assignmentId);

export const createAssignment = (assignment) => {
  const newAssignment = { ...assignment, _id: uuidv4() };
  return model.create(newAssignment);
};

export const updateAssignment = (assignmentId, updatedAssignment) => {
  return model.updateOne({ _id: assignmentId }, updatedAssignment);
};

export const deleteAssignment = (assignmentId) => {
  return model.deleteOne({ _id: assignmentId });
};