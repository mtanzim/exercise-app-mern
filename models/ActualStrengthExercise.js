import mongoose from "mongoose";
import {
  numberValidator,
  commonHostExercise,
  KG,
  LBS,
  STRENGTH
} from "./common";

import StrengthExercise from "./StrengthExercise";

let Schema = mongoose.Schema;
let ActualStrengthExercise = new Schema(
  {
    // _user: commonUser(CardioExercise),
    hostExercise: commonHostExercise(StrengthExercise, STRENGTH),
    unit: {
      type: String,
      enum: [KG, LBS],
      required: true
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

ActualStrengthExercise.path("actualSets").validate(function(v) {
  return v.length > 0;
});

export default mongoose.model("ActualStrengthExercise", ActualStrengthExercise);
