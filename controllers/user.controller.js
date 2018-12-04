import jtw from "jsonwebtoken";
import bcrypt from "bcrypt";
import gravatar from "gravatar";

//import Keys
import { keys } from "../config/keys";

//import Model user

import User from "../models/User.model";

let user = {};

/**
 * @desc Register User
 */
user.register = (req, res) => {
  const { email, name, password } = req.body;

  User.findOne({ email }).then(user => {
    if (user)
      return res.status(400).json({ email: "Email informado já é cadastrado" });

    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    const newUser = new User({ name, email, avatar, password });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return res.status(400).json({ err: "Erro no envio" });
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => res.status(400).json({ err: "Erro no envio" }));
      });
    });
  });
};

/**
 * @desc Login User /
 * @returns JWT Token
 */
user.login = (req, res) => {
  let { email, password } = req.body;

  password = JSON.stringify(password);

  User.findOne({ email }).then(user => {
    if (!user) return res.status(404).json({ email: "User not found" });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        jtw.sign(
          payload,
          keys.secretOrKeys,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        res.status(400).json({ password: "Password incorret" });
      }
    });
  });
};

/**
 * @desc get info current
 * @returns User current
 */
user.current = (req, res) => {
  res.json(req.user);
};

export default user;
