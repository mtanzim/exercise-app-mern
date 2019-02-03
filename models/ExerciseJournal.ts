import * as mongoose from "mongoose";
import { commonHostExercise } from "./common";
import ActualExercise from "./ActualExercise";

let Schema = mongoose.Schema;
let ExerciseJournal = new Schema(
  {
    desc: {
      type: String,
      maxlength: [250, "Exercise description is too long!"],
      required: false
    },
    actualExercises: [commonHostExercise(ActualExercise)]
  },
  {
    timestamps: true
  }
);

ExerciseJournal.pre("findOneAndUpdate", function(next) {
  // @ts-ignore
  this.options.runValidators = true;
  next();
});

export default mongoose.model("ExerciseJournal", ExerciseJournal);
