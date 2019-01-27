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
    let hostId;
    let timedSets;
    let weightedSets;
    // console.log(this.getUpdate().$set)
    try {
      // console.log('Updating object!')
      hostId = this.getUpdate().$set.hostExercise;
      timedSets = this.getUpdate().$set.timedSets;
      weightedSets = this.getUpdate().$set.weightedSets;
    } catch(err) {
      // console.log(err);
      try{
        // console.log('Creating new object!')
        hostId = this.hostExercise;
        timedSets = this.timedSets;
        weightedSets = this.weightedSets;
      } catch(err) {
        // console.log(err)
        reject(new Error(err));
      }
    }
    // console.log(hostId);

    Exercise.findOne({ _id: hostId })
      .then(res => {
        // console.log(res)
        // @ts-ignore
        if (res.type === CARDIO) {
          if (timedSets.length > 0) {
            resolve();
          } else {
            reject(new Error("Please provide timed sets!"));
          }
          // @ts-ignore
        } else if (res.type === STRENGTH) {
          if (weightedSets.length > 0) {
            resolve();
          } else {
            reject(new Error("Please weighted timed sets!"));
          }
        }
      })
      .catch(err => reject(new Error(err)));
  });
};

ActualExercise.path("weightedSets").validate(validateSets);
ActualExercise.path("timedSets").validate(validateSets);

ActualExercise.pre("findOneAndUpdate", function(next) {
  // @ts-ignore
  this.options.runValidators = true;
  next();
});

export default mongoose.model("ActualExercise", ActualExercise);
