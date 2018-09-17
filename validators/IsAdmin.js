const config = require("config");
const AuthActions = require("./../actions/AuthActions");
IsAdmin = () => {
  return async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (
        email === config.get("admin_email") &&
        password === config.get("admin_password")
      )
        res
          .status(200)
          .send({ admin_token: await AuthActions.createAdminToken() });
      else next();
    } catch (er) {
      return res.status(500).send("Internal Server error");
    }
  };
};

module.exports = IsAdmin;
