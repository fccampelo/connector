import express from "express";
import passport from "passport";

//Post Controller
import post from "../../controllers/post.controller";

const router = express.Router();

/**
 * @route Post /api/post/
 * @access private
 */
router.post("/", passport.authenticate("jwt", { session: false }), post.create);

export default router;
