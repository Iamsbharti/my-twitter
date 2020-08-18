const router = require("express").Router();
const { signUpControl } = require("../controller/signupcontrol");
const validation = require("../middlewares/validation");
const { logincontrol } = require("../controller/logincontrol");
const { isAuthorized } = require("../middlewares/authHandler");
const posts = require("../controller/postControl");
const managePassword = require("../controller/recoveryControl");
const { valid } = require("@hapi/joi");

/**user management */
router.post("/user/signup", validation.signUpParam, signUpControl);
router.post("/user/login", validation.loginParam, logincontrol);
router.post(
  "/user/recoveryPassword",
  validation.recoveryParam,
  managePassword.getRecoveryCode
);
router.post(
  "/user/resetPassword",
  validation.resetValidation,
  managePassword.resetPassword
);

/**post management */
router.post(
  "/post/createPost",
  isAuthorized,
  validation.postValidation,
  posts.createPost
);
router.get("/post/allPosts", isAuthorized, posts.getAllPosts);
router.post(
  "/post/updatePost",
  isAuthorized,
  validation.updatePostValidation,
  posts.updatePost
);
router.delete(
  "/post/deletePost",
  isAuthorized,
  validation.deletePostValidation,
  posts.deletePost
);
module.exports = router;
