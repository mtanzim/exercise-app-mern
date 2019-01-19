import * as mongoose from "mongoose";
import {
  commonExerciseDesc,
  commonTitle,
  STRENGTH,
  CARDIO,
} from "./common";

let Schema = mongoose.Schema;
let Exercise = new Schema(
  {
    title: commonTitle,
    type: {
      type: String,
      enum: [STRENGTH, CARDIO]
    },
    desc: commonExerciseDesc,
    deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Exercise", Exercise);
