const JwtStrategy = require("passport-jwt").Strategy;
const ExctractJwt = require("passport-jwt").ExtractJwt;
const db = require("../utils/db");
const config = require("../utils/config");
const User = require("../models/User");
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExctractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret,
      },
      (payload, done) => {
        try {
          db.query(
            `SELECT id, name, password, email, phone FROM users WHERE email = '${payload.email}' AND password = '${payload.password}'`,
            (error, result) => {
              if (error) {
                return console.log(error);
              }
              const [first] = result;
              const user = new User(
                first.id,
                first.name,
                first.password,
                first.email,
                first.phone
              );
              user ? done(null, user) : done(null, false);
              return User;
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
};
