function handleError(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (er) {
      console.log(er);
      const error = er.message.split("-");
      next(error);
    }
  };
}
module.exports = handleError;
