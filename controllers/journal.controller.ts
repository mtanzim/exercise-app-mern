import ExerciseJournal from "../models/ExerciseJournal";

import {
  saveModel,
  readModel,
  readAllModels,
  updateModel,
  deleteModel
} from "./common";

const Model = ExerciseJournal;

export const create = bodyArr => {
  return Promise.all(
    bodyArr.map(body => {
      let newModel = new Model(body);
      return saveModel(newModel);
    })
  );
};

export const read = id => {
  return readModel(Model, { _id: id });
};

export const readAll = () => {
  return readAllModels(Model);
};

export const update = (id, body) => {
  return updateModel(Model, { _id: id }, body);
};

export const del = id => {
  return deleteModel(Model, { _id: id });
};
