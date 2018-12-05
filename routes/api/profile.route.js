import express from "express";
import mongoose from "mongoose";
import passport from "passport";

//Profile Controller
import Profile from "../../controllers/profile.controller";

const router = express.Router();

/**
 * @route GET api/profile
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  Profile.getInfoUserCurrent
);

/**
 * @route Post api/profile
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  Profile.create
);

/**
 * @route Patch api/profile
 */
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  Profile.patch
);

export default router;
