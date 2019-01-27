import Exercise from "../models/Exercise";

export const createExercise = bodyArr => {
  return Promise.all(
    bodyArr.map(body => {
      let newExercise = new Exercise(body);
      return newExercise.save();
    })
  );
};

export const readExercise = id => {
  return Exercise.findOne({"_id":id});
};

export const readAllExercise = () => {
  return Exercise.find({});
};

export const updateExercise = (id, body) => {
  return Exercise.findOneAndUpdate({"_id":id}, body, { new: true });
};

export const deleteExercise = id => {
  return Exercise.findOneAndDelete({"_id":id});
};
export const softDeleteExercise = id => {
  return Exercise.findOneAndUpdate({"_id":id}, { deleted: true }, { new: true });
};
