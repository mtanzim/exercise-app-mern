import * as mongoose from "mongoose";
import {
  numberValidator,
  commonHostExercise,
  KG,
  LBS,
  S,
  STRENGTH,
  CARDIO
} from "./common";

import Exercise from "./Exercise";

let Schema = mongoose.Schema;
let ActualExercise = new Schema(
  {
    // @ts-ignore
    hostExercise: commonHostExercise(Exercise),
    unit: {
      type: String,
      enum: [S, KG, LBS],
      required: true
    },
    note: {
      type: String,
      maxlength: [250, "Exercise description is too long!"],
      required: false
    },
    actualSets: [
      {
        type: Number,
        required: [true, "Please provide at least one set of reps"],
        validate: numberValidator(0, 1000)
      }
    ]
  },
  {
    timestamps: true
  }
);

ActualExercise.path("actualSets").validate(function(v) {
  return v.length > 0;
});

ActualExercise.path("unit").validate(function(val) {
  return new Promise((resolve, reject) => {
    Exercise.findById(this.hostExercise)
      .then(res => {
        // @ts-ignore
        if (res.type === CARDIO) {
          resolve([S].indexOf(val) > -1);
          // @ts-ignore
        } else if (res.type === STRENGTH) {
          resolve([KG, LBS].indexOf(val) > -1);
        }
      })
      .catch(err => reject(new Error(err)));
  });
});

export default mongoose.model("ActualExercise", ActualExercise);
