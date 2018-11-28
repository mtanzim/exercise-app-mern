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
        })
        .catch(err => reject(new Error(err)));
    }); 
  },
  message: props => (`${props.value} is not of type ${type}`)
});

export const userValidator = (model) => ({
  validator: val => {
    return new Promise( (resolve, reject) =>{
      model.findById(val)
        .then(res => {
          resolve(ObjectId(res._id) === ObjectId(val._id));
        })
        .catch(err => reject(new Error(err)));
    }); 
  },
  message: props => (`${props.value} does not belong to user`)

});



export const commonUser = model => ({
  type: ObjectId,
  required: true,
  validate: userValidator(model)
});

export const commonExerciseDesc = {
  type: String,
  maxlength: [250, 'Exercise description is too long!'],
  required: false,
};

export const commonHostExercise = (model, type) => ({
  type: ObjectId,
  required: true,
  validate: hostValidator(model, type),
});

export const commonTitle = {
  type: String,
  maxlength: [25, 'Exercise title is too long!'],
  required: [true, 'Exercise title can not be empty'],
};
