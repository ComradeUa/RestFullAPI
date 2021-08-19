const express = require("express");
const { Passport } = require("passport");
const passport = require("passport");
const PORT = process.env.PORT || 3000;
const router = require("./routes");
const app = express();
const passportJwt = require("./middlewares/passport-jwt");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
passportJwt(passport);
app.use(passport.initialize());

app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server is run on port ${PORT}.`);
});
