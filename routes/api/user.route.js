import express from "express";
import passport from "passport";

//import Controllers
import User from "../../controllers/user.controller";

const router = express.Router();

/**
 * @route Post api/users/register
 * @desc Register User
 * @access Public
 */
router.post("/register", User.register);

/**
 * @route Post api/users/login
 * @desc Login User /
 * @access Public
 */
router.post("/login", User.login);

/**
 * @route Get api/users/current
 * @desc get user current
 * @access Private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  User.current
);

export default router;
