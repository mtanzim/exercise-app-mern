import Exercise from "../models/Exercise";

import {
  saveModel,
  readModel,
  readAllModels,
  updateModel,
  deleteModel
} from "./common";

export const createExercise = bodyArr => {
  return Promise.all(
    bodyArr.map(body => {
      let newExercise = new Exercise(body);
      return saveModel(newExercise);
    })
  );
};

export const readExercise = id => {
  return readModel(Exercise, { _id: id });
};

export const readAllExercise = () => {
  return readAllModels(Exercise);
};

export const updateExercise = (id, body) => {
  return updateModel(Exercise, { _id: id }, body);
};

export const deleteExercise = id => {
  return deleteModel(Exercise, { _id: id });
};
export const softDeleteExercise = id => {
  return Exercise.findOneAndUpdate(
    { _id: id },
    { deleted: true },
    { new: true }
  );
};
