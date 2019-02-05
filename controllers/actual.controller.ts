import * as mongoose from "mongoose";
import ActualExercise from "../models/ActualExercise";
import { deleteModel, readAllModels, readModel, saveModel } from "./common";
const ObjectId = mongoose.Types.ObjectId;

export const createActuals = bodyArr => {
  return Promise.all(
    bodyArr.map(body => {
      // convert to object id
      body.hostExercise = ObjectId(body.hostExercise);
      let newActualExercise = new ActualExercise(body);
      return saveModel(newActualExercise);
    })
  );
};

export const readActual = id => {
  return readModel(ActualExercise, { _id: id });
};
export const readAllActual = () => {
  return readAllModels(ActualExercise);
};

export const updateActual = async (id, body) => {
  // validators require host id to ensure wrong exercise sets won't be used
  // this method has to use a different update mechanism
  const currentActual = await readActual(id);
  body = { ...body, hostExercise: currentActual["hostExercise"] };
  return ActualExercise.findOneAndUpdate({ _id: id }, body, {
    new: true,
    // for update validators
    context: "query"
  });
};

export const deleteActual = id => {
  return deleteModel(ActualExercise, { _id: id });
};
