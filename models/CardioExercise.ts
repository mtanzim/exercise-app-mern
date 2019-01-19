import * as mongoose from "mongoose";
import {
  numberValidator,
  commonExerciseDesc,
  commonTitle,
  CARDIO,
  MS
} from "./common";

let Schema = mongoose.Schema;
// var ObjectId = mongoose.Schema.Types.ObjectId;

let CardioExercise = new Schema(
  {
    title: commonTitle,
    type: {
      type: String,
      enum: [CARDIO]
    },
    desc: commonExerciseDesc,
/*     targetTime: {
      type: Number,
      validate: numberValidator(0, 86400000),
      required: true
    },
    unitTime: {
      type: String,
      enum: [MS],
      required: true
    }, */
    deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("CardioExercise", CardioExercise);
