import ActualExercise from "../models/ActualExercise";
import * as mongoose from "mongoose";
import { ObjectID } from "bson";
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

export const readActual = id => {
  return ActualExercise.findOne({ _id: id });
};

export const updateActual = async (id, body) => {
  // validators require host id to ensure wrong exercise sets won't be used
  // @ts-ignore
  // console.log(body);
  // const host

  const currentActual = await readActual(id);
  // console.log(body);
  body = { ...body, hostExercise: currentActual["hostExercise"] };
  // console.log("after update");
  // console.log(body);
  return ActualExercise.findOneAndUpdate({ _id: id }, body, {
    new: true,
    // for update validators
    context: "query"
  });
};

export const deleteActual = id => {
  return ActualExercise.findOneAndDelete({ _id: id });
};
