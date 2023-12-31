const authenticationCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect(`/`);
  }
};

export { authenticationCheck };
