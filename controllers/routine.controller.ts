import Routine from "../models/Routine";

import {
  saveModel,
  readModel,
  readAllModels,
  updateModel,
  deleteModel
} from "./common";

export const create = bodyArr => {
  return Promise.all(
    bodyArr.map(body => {
      let newRoutine = new Routine(body);
      return saveModel(newRoutine);
    })
  );
};

export const read = id => {
  return readModel(Routine, { _id: id });
};

export const readAll = () => {
  return readAllModels(Routine);
};

export const update = (id, body) => {
  // console.log(body)
  return updateModel(Routine, { _id: id }, body);
};

export const del = id => {
  return deleteModel(Routine, { _id: id });
};

