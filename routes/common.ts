export enum InputType {
  NONE,
  BODY,
  ID,
  ID_BODY
}

export const generateResponseFunc = (
  inputType: InputType,
  funcToExec: Function
) => {
  return async (req, res, next) => {
    try {
      let result;
      if (inputType === InputType.BODY) {
        result = await funcToExec(req.body);
      } else if (inputType === InputType.ID) {
        result = await funcToExec(req.params.id);
      } else if (inputType === InputType.ID_BODY) {
        result = await funcToExec(req.params.id, req.body);
      } else if (inputType === InputType.NONE) {
        result = await funcToExec();
      }
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  };
};
