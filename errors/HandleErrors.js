function handleError(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (er) {
      console.log(er);
      let errorArray = [];
      for (fields in er.errors)
        errorArray = [...errorArray, er.errors[fields].message];
      next(errorArray);
    }
  };
}
module.exports = handleError;
