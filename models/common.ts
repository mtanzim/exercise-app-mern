import * as mongoose from "mongoose";
let ObjectId = mongoose.Schema.Types.ObjectId;

export const CARDIO = "cardio";
export const S = "s";
export const STRENGTH = "strength";
export const KG = "kg";
export const LBS = "lbs";

export const numberValidator = (min, max) => ({
  validator: val => {
    return val > min && val < max;
  },
  message: props => `${props.value} is not between ${min} and ${max}`
});

export const hostValidator = model => ({
  validator: val => {
    return new Promise((resolve, reject) => {
      model
        .findById(val)
        .then(res => {
          // console.log(res)
          resolve(true);
        })
        .catch(err => reject(new Error(err)));
    });
  },
  message: props => `${props.value} doesn't belong to an exercise.`
});

export const userValidator = model => ({
  validator: val => {
    return new Promise((resolve, reject) => {
      model
        .findById(val)
        .then(res => {
          resolve(new ObjectId(res._id) === new ObjectId(val._id));
        })
        .catch(err => reject(new Error(err)));
    });
  },
  message: props => `${props.value} does not belong to user`
});

export const commonUser = model => ({
  type: ObjectId,
  required: true,
  validate: userValidator(model)
});

export const commonHostExercise = model => ({
  type: ObjectId,
  required: true,
  validate: hostValidator(model)
});

