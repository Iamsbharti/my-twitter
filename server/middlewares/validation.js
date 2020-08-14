const joi = require("@hapi/joi");
const { formatResponse } = require("../library/formatResponse");
const options = { abortEarly: false };

exports.signUpParam = (req, res, next) => {
  console.log("Sign up validation");
  let signupSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().min(4).email(),
    username: joi.string().min(1).alphanum(),
  });
  let { error } = signupSchema.validate(req.body, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message));
    return res
      .status(400)
      .json(formatResponse(true, 400, "In-Valid I/p Parameters", errors));
  }
  next();
};
