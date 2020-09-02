const router = require("express").Router();
const { signUpControl } = require("../controller/signupcontrol");
const validation = require("../middlewares/validation");
const { logincontrol } = require("../controller/logincontrol");
const { isAuthorized } = require("../middlewares/authHandler");
const posts = require("../controller/postControl");
const users = require("../controller/userControl");
const managePassword = require("../controller/recoveryControl");

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
router.get(
  "/user/getUser",
  isAuthorized,
  validation.getUserValidation,
  users.getUserInfo
);
router.post(
  "/user/updateUser",
  isAuthorized,
  validation.updateUserValidation,
  users.updateUserInfo
);
router.get("/user/allUsers", isAuthorized, users.getUserList);
router.get(
  "/user/getChat",
  isAuthorized,
  validation.getChatValidation,
  users.getChatsBetweenUsers
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

/**comments management */
router.post(
  "/post/addComment",
  isAuthorized,
  validation.commentValidation,
  posts.addComment
);
router.delete(
  "/post/deleteComment",
  isAuthorized,
  validation.deleteCommentValidation,
  posts.deleteComment
);

module.exports = router;
