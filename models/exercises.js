import mongoose  from 'mongoose';
let Schema = mongoose.Schema;

// const findUser = require("../controllers/user.controller").getOneUser;

const numberValidator = (min, max) => ({
  validator: val => {
    return (val > min && val < max);
  },
  message: props => (`${props.value} is not between ${min} and ${max}`)
});

const checkExerciseType = (type, checkAgainst) => (type === checkAgainst)

const CARDIO = "cardio";
const STRENGTH = "strength";
const KG = "kg";
const LBS = "lbs";
const MS = "ms";

let Exercise = new Schema({

  title: {
    type: String,
    maxlength: [25, 'Exercise title is too long!'],
    required: [true, 'Exercise title can not be empty'],
  },
  type: {
    type: String,
    enum: [CARDIO, STRENGTH]
  },
  time: {
    type: Number,
    validate: numberValidator(0, 86400000),
    required: function () {
      return checkExerciseType(this.type, CARDIO)
    }
  },
  unitTime: {
    type: String,
    enum: [MS],
    required: function () {
      return checkExerciseType(this.type, CARDIO)
    }
  },
  weight :{
    type: Number,
    required: function () {
      return checkExerciseType(this.type, STRENGTH)
    },
    validate: numberValidator(0,2000)
  },
  unit: {
    type:String,
    enum: [KG, LBS],
    required: function () {
      return checkExerciseType(this.type, STRENGTH)
    }
  },
  sets:
    [{
      type: Number,
      required: [true, "Please provide at least one set of reps"],
      validate: numberValidator(0,1000),
    }]
}, {
  timestamps: true,

});

Exercise.path('sets').validate(function (v) {
  return v.length > 0 || checkExerciseType(this.type, CARDIO);
}) 


export default mongoose.model('Exercise', Exercise);

