import mongoose  from 'mongoose';
import {numberValidator, commonExerciseDesc, commonTitle, STRENGTH, KG, LBS} from './common';

let Schema = mongoose.Schema;
let StrengthExercise = new Schema({

  title: commonTitle,
  type: {
    type: String,
    enum: [STRENGTH]
  },
  desc: commonExerciseDesc,
  weight :{
    type: Number,
    required: true,
    validate: numberValidator(0,2000)
  },
  unit: {
    type:String,
    enum: [KG, LBS],
    required: true
  },
  targetSets: [{
    type: Number,
    required: [true, 'Please provide at least one set of reps'],
    validate: numberValidator(0,1000),
  }],
  deleted: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,

});

StrengthExercise.path('targetSets').validate(function (v) {
  return v.length > 0;
}) 


export default mongoose.model('StrengthExercise', StrengthExercise);