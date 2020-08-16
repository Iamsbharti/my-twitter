const router = require("express").Router();
const { signUpControl } = require("../controller/signupcontrol");
const {
  signUpParam,
  loginParam,
  recoveryParam,
  resetValidation,
  postValidation,
} = require("../middlewares/validation");
const { logincontrol } = require("../controller/logincontrol");
const { isAuthorized } = require("../middlewares/authHandler");
const posts = require("../controller/postControl");
const {
  getRecoveryCode,
  resetPassword,
} = require("../controller/recoveryControl");

/**user management */
router.post("/user/signup", signUpParam, signUpControl);
router.post("/user/login", loginParam, logincontrol);
router.post("/user/recoveryPassword", recoveryParam, getRecoveryCode);
router.post("/user/resetPassword", resetValidation, resetPassword);

/**post management */
router.post("/post/createPost", isAuthorized, postValidation, posts.createPost);
module.exports = router;
