import Exercise from "../models/Exercise";
import * as mongoose from "mongoose";

export const createExercise = bodyArr => {
  return Promise.all(
    bodyArr.map(body => {
      let newExercise = new Exercise(body);
      return newExercise.save();
    })
  );
};

export const readExercise = id => {
  return Exercise.findById(id);
};

export const readAllExercise = () => {
  return Exercise.find({});
};

export const updateExercise = (id, body) => {
  return Exercise.findByIdAndUpdate(id,  body, { new: true });
};

export const deleteExercise = id => {
  return Exercise.findByIdAndDelete(id);
};
export const softDeleteExercise = id => {
  return Exercise.findByIdAndUpdate(id, { deleted: true }, { new: true });
};


