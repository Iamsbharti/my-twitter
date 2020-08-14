const router = require("express").Router();
const { signUpControl } = require("../controller/signupcontrol");
const { signUpParam } = require("../middlewares/validation");

router.post("/user/signup", signUpParam, signUpControl);

module.exports = router;
