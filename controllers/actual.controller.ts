import ActualExercise from "../models/ActualExercise";
import * as mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const createActuals = bodyArr => {
  return Promise.all(
    bodyArr.map(body => {
      // convert to object id
      body.hostExercise = ObjectId(body.hostExercise);
      let newActualExercise = new ActualExercise(body);
      return newActualExercise.save();
    })
  );
};
