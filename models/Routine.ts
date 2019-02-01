import * as mongoose from "mongoose";
import { commonHostExercise, numberValidator } from "./common";
import Exercise from "./Exercise";
// import {hostValidator} from "./common"
let ObjectId = mongoose.Schema.Types.ObjectId;

let Schema = mongoose.Schema;
let Routine = new Schema(
  {
    title: {
      type: String,
      maxlength: [25, "Exercise title is too long!"],
      required: [true, "Exercise title can not be empty"],
      unique: true,
      dropDups: true
    },
    desc: {
      type: String,
      maxlength: [250, "Exercise description is too long!"],
      required: false
    },
    exercises: [
      {
        qty: {
          type: Number,
          validate: numberValidator(0, 1000),
          required: true
        },
        exercise: commonHostExercise(Exercise)
      }
    ]
  },
  {
    timestamps: true
  }
);

Routine.pre("findOneAndUpdate", function(next) {
  // @ts-ignore
  this.options.runValidators = true;
  next();
});

export default mongoose.model("Routine", Routine);
