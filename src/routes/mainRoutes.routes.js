import express from "express";
import passport from "passport";
import users from "../model/users.model.js";
import {
  authenticationCheck,
  unauthenticationCheck,
} from "../middleware/auth.middleware.js";

const mainRoutes = express.Router();

mainRoutes.get(`/`, (req, res) => {
  res.render("homepage", { isLoggedIn: false });
});

mainRoutes.get(`/login`, unauthenticationCheck, (req, res) => {
  res.render("login", { isLoggedIn: false });
});

mainRoutes.get(`/register`, unauthenticationCheck, (req, res) => {
  res.render("register", { isLoggedIn: false });
});

mainRoutes.get(`/aboutus`, authenticationCheck, (req, res) => {
  res.render("about", { isLoggedIn: true });
});

mainRoutes.get(`/secrets`, authenticationCheck, (req, res) => {
  res.render(`secrets`, { isLoggedIn: true });
});

mainRoutes.post(`/login`, (req, res) => {
  const newUser = new users({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(newUser, (err) => {
    if (err) {
      console.error("error", err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect(`/secrets`);
      });
    }
  });
});

mainRoutes.post(`/register`, (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
  };

  users.register({ username: newUser.username }, req.body.password, (err) => {
    if (err) {
      console.log("name of the error : ", err);
    } else {
      passport.authenticate("local", {
        successRedirect: "/secrets",
        failureRedirect: "/",
      })(req, res);
    }
  });
});

mainRoutes.get(`/logout`, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    res.redirect(`/`);
  });
});

export { mainRoutes };
