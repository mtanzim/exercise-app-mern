// import Exercise from "../models/Exercise";
import * as mongoose from "mongoose";

interface Params {
  _id: string;
}

export const saveModel = newDoc => newDoc.save();
export const readModel = (model, params: Params) => model.findOne(params);
export const readAllModels = model => model.find({});
export const updateModel = (model, params: Params, update: object) => {
  return model.findOneAndUpdate(params, update, { new: true });
};
export const deleteModel = (model, params: Params) =>
  model.findOneAndDelete(params);
