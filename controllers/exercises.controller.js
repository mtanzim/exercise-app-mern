import StrenghtExercise from '../models/StrengthExercise';
import CardioExercise from '../models/CardioExercise';
import ActualCardioExercise from '../models/ActualCardioExercise'
import ActualStrengthExercise from '../models/ActualStrengthExercise'

import mongoose from 'mongoose';
let ObjectId = mongoose.Types.ObjectId;

import {CARDIO, STRENGTH} from '../models/common';


export const getAllExercises = () => {
  let body;

  

}

export const createExercise = (bodyArr) => {
  // console.log(body);
  return Promise.all(bodyArr.map(body => {
    let newExercise;
    if (body.type === CARDIO ) {
      newExercise = new CardioExercise(body);
    } else if (body.type === STRENGTH) {
      newExercise = new StrenghtExercise(body);
    } else {
      throw new Error('Invalid exercise type');
    }
    // console.log (JSON.stringify(newExercise));
    return newExercise.save();
  }));
};

export const createActualExercise = (type, bodyArr) => {
  return Promise.all(bodyArr.map(body => {
    // convert to object id
    body._id = ObjectId(body._id);
    let newActualExercise;
    if (type === CARDIO) {
      newActualExercise = new ActualCardioExercise(body);
    } else if (type === STRENGTH) {
      newActualExercise = new ActualStrengthExercise(body);
    } else {
      throw new Error('Invalid exercise type');
    }
    return newActualExercise.save();
  }));
};
