import express from "express";
import mongoose from "mongoose";
import passport from "passport";

//Profile Controller
import Profile from "../../controllers/profile.controller";

const router = express.Router();

/**
 * @route GET api/profile
 * @access private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  Profile.getInfoUserCurrent
);

/**
 * @route Post api/profile
 * @access private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  Profile.create
);

/**
 * @route Patch api/profile/:id
 * @access private
 */
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  Profile.patch
);

/**
 * @route Get api/profile/handle/:handle
 * @access private
 */
router.get(
  "/handle/:handle",
  passport.authenticate("jwt", { session: false }),
  Profile.getHandle
);

/**
 * @route Get api/profile/user/:user_id
 * @access private
 */
router.get(
  "/user/:user_id",
  passport.authenticate("jwt", { session: false }),
  Profile.getProfile
);

/**
 * @route Get api/profile/:all
 * @access private
 */
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  Profile.getAllProfile
);

export default router;
