const joi = require("@hapi/joi");
const { formatResponse } = require("../library/formatResponse");
const options = { abortEarly: false };
const logger = require("../library/logger");

exports.signUpParam = (req, res, next) => {
  logger.info("Sign up validation");
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
exports.loginParam = (req, res, next) => {
  logger.info("Login validation");
  let loginSchema = joi.object({
    loginId: joi.string().min(4).required(),
    password: joi.string().required(),
  });
  let { error } = loginSchema.validate(req.body, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message));
    return res
      .status(400)
      .json(formatResponse(true, 400, "In-Valid I/p Parameters", errors));
  }
  next();
};
exports.recoveryParam = (req, res, next) => {
  logger.info("Password Recovery validation");
  let recoverySchema = joi.object({
    loginId: joi.string().min(4).required(),
  });
  let { error } = recoverySchema.validate(req.body, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message));
    return res
      .status(400)
      .json(formatResponse(true, 400, "In-Valid I/p Parameters", errors));
  }
  next();
};
exports.resetValidation = (req, res, next) => {
  logger.info("Password Reset validation");
  let resetSchema = joi.object({
    email: joi.string().min(4).email().required(),
    recoveryCode: joi.string().min(6).optional(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
    currentPassword: joi.string().optional(),
    operation: joi.valid("set", "reset").required(),
  });
  let { error } = resetSchema.validate(req.body, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message));
    return res
      .status(400)
      .json(formatResponse(true, 400, "In-Valid I/p Parameters", errors));
  }
  next();
};
