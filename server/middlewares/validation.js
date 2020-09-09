const joi = require("@hapi/joi");
const { formatResponse } = require("../library/formatResponse");
const options = { abortEarly: false };
const logger = require("../library/logger");

const signUpParam = (req, res, next) => {
  logger.info("Sign up validation");
  let signupSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().min(4).email(),
    username: joi.string().min(1).alphanum(),
  });
  let { error } = signupSchema.validate(req.body, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const loginParam = (req, res, next) => {
  logger.info("Login validation");
  let loginSchema = joi.object({
    loginId: joi.string().min(4).required(),
    password: joi.string().required(),
  });
  let { error } = loginSchema.validate(req.body, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const recoveryParam = (req, res, next) => {
  logger.info("Password Recovery validation");
  let recoverySchema = joi.object({
    loginId: joi.string().min(4).required(),
  });
  let { error } = recoverySchema.validate(req.body, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const resetValidation = (req, res, next) => {
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
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const postValidation = (req, res, next) => {
  logger.info(`Create Post validation:${req.body}`);

  let postSchema = joi.object({
    description: joi.string().min(4).required(),
    userAvatar: joi.string().optional(),
    displayName: joi.string().required(),
    userName: joi.string().required(),
    userId: joi.string().required(),
    verified: joi.boolean().optional(),
    image: joi.optional(),
    comments: joi.array().optional(),
    retweets: joi.number().optional(),
    likes: joi.number().optional(),
    shares: joi.number().optional(),
  });

  let { error } = postSchema.validate(req.body, options);
  // console.log("error::", error);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const updatePostValidation = (req, res, next) => {
  logger.info("Update Post validation");
  let postSchema = joi.object({
    postId: joi.string().required(),
    update: joi.object().required(),
    isComment: joi.boolean().required(),
    userId: joi.string().required(),
  });
  let { error } = postSchema.validate(req.body, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const deletePostValidation = (req, res, next) => {
  logger.info(`Delete Post validation:: ${req.query.postId}`);
  let postSchema = joi.object({
    postId: joi.string().required(),
    authToken: joi.string().required(),
  });
  let { error } = postSchema.validate(req.query, options);
  console.log("dele validation err::", error);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const commentValidation = (req, res, next) => {
  logger.info("Post Comment validation");
  let commentSchema = joi.object({
    postId: joi.string().min(4).required(),
    description: joi.string().min(4).required(),
    userAvatar: joi.string().optional(),
    displayName: joi.string().required(),
    userName: joi.string().required(),
    userId: joi.string().required(),
    verified: joi.boolean().optional(),
    image: joi.optional(),
    comments: joi.array().optional(),
    retweets: joi.number().optional(),
    likes: joi.number().optional(),
    shares: joi.number().optional(),
  });

  let { error } = commentSchema.validate(req.body, options);
  logger.error(`Validation Error-${error}`);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const deleteCommentValidation = (req, res, next) => {
  logger.info(`Delete comment validation:: ${req.query.commentId}`);
  let commentSchema = joi.object({
    commentId: joi.string().required(),
    authToken: joi.string().required(),
  });
  let { error } = commentSchema.validate(req.query, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const getUserValidation = (req, res, next) => {
  logger.info(`Get UserInfo validation:: ${req.query.userId}`);
  let userSchema = joi.object({
    userId: joi.string().required(),
    authToken: joi.string().required(),
  });
  let { error } = userSchema.validate(req.query, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const updateUserValidation = (req, res, next) => {
  logger.info(`Update UserInfo validation:: ${req.body.userId}`);
  let userSchema = joi.object({
    userId: joi.string().required(),
    updates: joi.object().required(),
  });
  let { error } = userSchema.validate(req.body, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const getChatValidation = (req, res, next) => {
  logger.info(`Get Chat validation`);
  let chatSchema = joi.object({
    senderId: joi.string().required(),
    recieverId: joi.string().required(),
    authToken: joi.string().required(),
  });
  let { error } = chatSchema.validate(req.query, options);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};

module.exports = {
  signUpParam,
  loginParam,
  recoveryParam,
  resetValidation,
  postValidation,
  updatePostValidation,
  deletePostValidation,
  commentValidation,
  deleteCommentValidation,
  getUserValidation,
  updateUserValidation,
  getChatValidation,
};
