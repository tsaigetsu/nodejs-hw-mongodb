// src/utils/ctrlWrapper.js

export const ctrlWrapper = (ctrl) => {
  return (req, res, next) => {
    return ctrl(req, res, next).catch(next);
  };
};
