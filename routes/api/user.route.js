import express from "express";

//import Controllers
import User from "../../controllers/user.controller";

const router = express.Router();

/**
 * @route Get api/users/test
 * @desc Test users route
 * @access Public
 */
router.get("/test", (req, res) => res.json({ msg: "Users working" }));

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
 * @returns JWT Token
 */
router.post("/login", User.login);

export default router;