import StrenghtExercise from '../models/StrengthExercise';
import CardioExercise from '../models/CardioExercise';
import {CARDIO, STRENGTH, MS, KG, LBS} from '../models/common'

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
}
