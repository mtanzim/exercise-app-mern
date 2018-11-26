import Exercise from '../models/exercises';

export const createExercise = (body) => {
  console.log(body);
  const newExercise = new Exercise(body);
  console.log (JSON.stringify(newExercise));
  return newExercise.save();
}
