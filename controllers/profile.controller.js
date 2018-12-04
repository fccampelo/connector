//Profile model
import Profile from "../models/Profile.model";

let profile = {};

/**
 * @desc Get profile information of the logged in user
 */
profile.getInfoUserCurrent = (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noprofile = "Esse usuário ainda não tem um profile";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

export default profile;
