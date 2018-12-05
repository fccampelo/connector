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

/**
 * @desc create profile
 */
profile.create = (req, res) => {
  const profileFilds = req.body;

  const data = [];
  profileFilds.user = req.user.id;

  Profile.findOne({ user: profileFilds.user }).then(profile => {
    if (profile) {
      return res.status(400).json({ profile: "Profile já cadastrado" });
    } else {
      const newProfile = new Profile(profileFilds);
      newProfile
        .save()
        .then(profile => {
          data.push(profile);
          res.status(201).json(data);
        })
        .catch(err => console.log(err));
    }
  });
};

/**
 * @desc create profile
 */
profile.patch = (req, res) => {
  const id = req.params.id;
  const profileFilds = req.body;

  Profile.findById(id).then(profile => {
    if (!profile) {
      return res.status(400).json({ profile: "Profile já cadastrado" });
    } else {
      Profile.findOneAndUpdate(
        { _id: id },
        { $set: profileFilds },
        { new: true }
      )
        .then(data => {
          res.json(data);
        })
        .catch(err => res.status(400).json(err));
    }
  });
};

/**
 * @desc get Handle
 */
profile.getHandle = (req, res) => {
  const errors = {};
  const { handle } = req.params;
  Profile.findOne({ handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "Este não é um perfil de um usuário";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

/**
 * @desc find the profile with id
 */
profile.getProfile = (req, res) => {
  const errors = {};
  const { user_id } = req.params;
  Profile.findOne({ user: user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "Este não é um perfil de um usuário";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

/**
 * @desc find all profile
 */
profile.getAllProfile = (req, res) => {
  const errors = {};
  const result = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profile => {
      result.data = profile;
      res.status(200).json(result);
    })
    .catch(err => res.status(404).json(err));
};

export default profile;
