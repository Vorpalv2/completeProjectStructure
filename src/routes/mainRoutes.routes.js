import express from "express";
import passport from "passport";
import users from "../model/users.model.js";
import { authenticationCheck } from "../middleware/auth.middleware.js";

const mainRoutes = express.Router();

mainRoutes.get(`/`, (req, res) => {
  res.render("homepage");
});

mainRoutes.get(`/login`, (req, res) => {
  res.render("login");
});

mainRoutes.get(`/register`, (req, res) => {
  res.render("register");
});

mainRoutes.get(`/aboutus`, (req, res) => {
  res.json({ message: "still working on it" });
});

mainRoutes.get(`/secrets`, authenticationCheck, (req, res) => {
  res.render(`secrets`);
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