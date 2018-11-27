// import CardioExercise from './CardioExercise';
// import StrengthExercise from './StrengthExercise';
import mongoose from 'mongoose';
let ObjectId = mongoose.Schema.Types.ObjectId;

export const CARDIO = "cardio";
export const MS = "ms";
export const STRENGTH = "strength";
export const KG = "kg";
export const LBS = "lbs";

export const numberValidator = (min, max) => ({
  validator: val => {
    return (val > min && val < max);
  },
  message: props => (`${props.value} is not between ${min} and ${max}`)
});

export const hostValidator = (model, type) => ({
  validator: val => {
    return new Promise( (resolve, reject) =>{
      model.findById(val)
        .then(res => {
          resolve(res.type === type);
        });
    })
  },
  message: props => (`${props.value} is not of type ${type}`)
});

export const commonExerciseDesc = {
  type: String,
  maxlength: [250, 'Exercise description is too long!'],
  required: false,
}

export const commonHostExercise = {
  type: ObjectId,
  required: true,
  validate: hostValidator(CARDIO),
}

export const commonTitle = {
  type: String,
  maxlength: [25, 'Exercise title is too long!'],
  required: [true, 'Exercise title can not be empty'],
}
