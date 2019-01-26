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
    note: {
      type: String,
      maxlength: [250, "Exercise description is too long!"],
      required: false
    },
    weightedSets: [
      {
        weight: {
          type: Number,
          validate: numberValidator(0, 1000),
          required: true
        },
        weightUnit: {
          type: String,
          enum: [KG, LBS],
          required: true
        },
        count: {
          type: Number,
          required: [true, "Please provide at least one set of reps"],
          validate: numberValidator(0, 1000)
        }
      }
    ],
    timedSets: [
      {
        time: {
          type: Number,
          validate: numberValidator(0, 1000),
          required: true
        },
        timeUnit: {
          type: String,
          enum: [S],
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const validateSets = function(val) {
  return new Promise((resolve, reject) => {
    Exercise.findById(this.hostExercise)
      .then(res => {
        // @ts-ignore
        if (res.type === CARDIO) {
          if (this.timedSets.length > 0) {
            resolve();
          } else {
            reject (new Error("Please provide timed sets!"));
          }
          // @ts-ignore
        } else if (res.type === STRENGTH) {
          if (this.weightedSets.length > 0) {
            resolve();
          } else {
            reject (new Error("Please weighted timed sets!"));
          }
        }
      })
      .catch(err => reject(new Error(err)));
  });
};

ActualExercise.path("weightedSets").validate(validateSets);
ActualExercise.path("timedSets").validate(validateSets);

export default mongoose.model("ActualExercise", ActualExercise);
