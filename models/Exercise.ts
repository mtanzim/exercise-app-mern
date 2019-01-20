import * as mongoose from "mongoose";
import {  STRENGTH, CARDIO } from "./common";

let Schema = mongoose.Schema;
let Exercise = new Schema(
  {
    title: {
      type: String,
      maxlength: [25, "Exercise title is too long!"],
      required: [true, "Exercise title can not be empty"],
      unique: true,
      dropDups: true,
    },
    type: {
      type: String,
      enum: [STRENGTH, CARDIO]
    },
    desc: {
      type: String,
      maxlength: [250, "Exercise description is too long!"],
      required: false
    },
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
