import Exercise from "../models/Exercise";
import ActualExercise from "../models/ActualExercise";

import * as mongoose from "mongoose";
let ObjectId = mongoose.Types.ObjectId;

import { CARDIO, STRENGTH } from "../models/common";

export const getAllExercises = () => {
  let body;
};

export const createExercise = bodyArr => {
  return Promise.all(
    bodyArr.map(body => {
      let newExercise = new Exercise(body);
      return newExercise.save();
    })
  );
};

export const createActualExercise = (type, bodyArr) => {
  return Promise.all(
    bodyArr.map(body => {
      // convert to object id
      body._id = ObjectId(body._id);
      let newActualExercise = new ActualExercise(body)
      return newActualExercise.save();
    })
  );
};
