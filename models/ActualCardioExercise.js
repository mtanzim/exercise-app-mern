import mongoose from "mongoose";
import {
  numberValidator,
  hostValidator,
  MS,
  CARDIO,
  commonHostExercise,
  commonUser
} from "./common";
import CardioExercise from "./CardioExercise";
// import User from './User';

let Schema = mongoose.Schema;

let ActualCardioExercise = new Schema(
  {
    // _user: commonUser(CardioExercise),
    hostExercise: commonHostExercise(CardioExercise, CARDIO),
    actualTime: {
      type: Number,
      validate: numberValidator(0, 86400000),
      required: true
    },
    unitTime: {
      type: String,
      enum: [MS],
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("ActualCardioExercise", ActualCardioExercise);
