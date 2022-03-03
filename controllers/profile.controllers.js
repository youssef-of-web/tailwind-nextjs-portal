const express = require("express");
const { session } = require("passport");
const passport = require("passport");
const router = express.Router();
const Profile = require("../models/profile.models");
const User = require("../models/users.models");
const validateProfileInput = require("../validator/Profile");
//const validateExperienceInput = require('../validator/Experiences')
//const validateEducationInput = require('../validator/educations')
router.get("/test", (req, res) => res.json("work profile"));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "email"])
      .then((profile) => {
        res.json(profile);
      })
      .catch((err) => res.status(500).json(err));
  }
);
//@route POST api/profile/
//@desc POST profile route
//@access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {


   /*  if (!isValid) {
      return res.status(404).json(errors);
    } */
    const fieldsProfile = {};

    fieldsProfile.user = req.user.id;

    if (req.body.address) {
      fieldsProfile.address = req.body.address;
    }
    if (req.body.city) {
      fieldsProfile.city = req.body.city;
    }
    if (req.body.country) {
      fieldsProfile.country = req.body.country;
    }
    if (req.body.postalcode) {
      fieldsProfile.postalcode = req.body.postalcode;
    }
    if (req.body.about) {
      fieldsProfile.about = req.body.about;
    }
    if (req.body.company) {
      fieldsProfile.company = req.body.company;
    }
    if (req.body.location) {
      fieldsProfile.location = req.body.company;
    }
    if (req.body.website) {
      fieldsProfile.website = req.body.website;
    }
    if (req.body.status) {
      fieldsProfile.status = req.body.status;
    }
    if (req.body.bio) {
      fieldsProfile.bio = req.body.bio;
    }

    if (req.body.githubusername) {
      fieldsProfile.githubusername = req.body.githubusername;
    }

   /*  if (typeof req.body.skills != undefined) {
      fieldsProfile.skills = req.body.skills.split(",");
    } */

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: fieldsProfile },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        const errors = {};
        Profile.findOne({ handle: req.body.handle }).then((profile) => {
          if (profile) {
            errors.existhandle = "handle exist";
            res.status(404).json(errors);
          }
        });

        const newprofile = new Profile(fieldsProfile);
        newprofile.save().then((profile) => res.json(profile));
      }
    });
  }
);

//find profile with user_id

router.get("/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "profile not exist";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json({ profile: "there is no profile" }));
});

//@route POST api/profiles/experiences
//@desc POST experiences route
//@access private
router.post(
  "/experiences",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        const newexperience = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };

        profile.experience.unshift(newexperience);
        profile.save().then((profile) => res.json(profile));
      } else {
        res;
        json({ profile: "not exists" });
      }
    });
  }
);
//@route POST api/profiles/educations
//@desc POST educations route
//@access private
router.post(
  "/educations",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      profile.education.unshift(newEducation);
      profile.save().then((profile) => res.json(profile));
    });
  }
);
//@route DELETE api/profiles/experience/id
//@desc DELETE experience route
//@access private
router.delete(
  "/experiences/:experience_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        //get remove index
        const removeIndexExperience = profile.experience
          .map((item) => item.id)
          .indexOf(req.params.experience_id);
        if (removeIndexExperience > -1) {
          profile.experience.splice(removeIndexExperience, 1);
          profile.save().then((profile) => res.json(profile));
        } else {
          errors.noExperienceId = "experince may be deleted or not found";
          return res.status(404).json(errors);
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);
//@route DELETE api/profiles/educations/id
//@desc DELETE educations route
//@access private
router.delete(
  "/educations/:education_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        const removeIndexEducation = profile.education
          .map((item) => item.id)
          .indexOf(req.params.education_id);
        if (removeIndexEducation > -1) {
          profile.education.splice(removeIndexEducation, 1);
          profile.save().then((profile) => res.json(profile));
        } else {
          errors.noEducationId = "education my be deleted or not found";
          res.status(404).json(errors);
        }
      })
      .catch((err) => res.status(404).json({ profile: "profile not found" }));
  }
);
//@route DELETE api/profiles/
//@desc DELETE profiles route
//@access private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
