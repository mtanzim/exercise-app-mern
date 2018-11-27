import Exercise from '../models/exercises';

export const createExercise = (bodyArr) => {
  // console.log(body);
  return Promise.all(bodyArr.map(body => {
    const newExercise = new Exercise(body);
    // console.log (JSON.stringify(newExercise));
    return newExercise.save();
  }));
}
