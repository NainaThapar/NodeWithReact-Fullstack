const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users"); //one arguement trying to fetch out of mongoose

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      //console.log("access token : ", accessToken);
      //console.log("refresh token : ", refreshToken);
      //console.log("profile ", profile);

      User.findOne({ googleId: profile.id }).then(existingUser => {
        //async func
        if (existingUser) {
          //we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          //we don't have a record with this ID. Make a new record.
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user)); //save method saves it to db else it's just an instance in js
        }
      });
    }
  )
);
