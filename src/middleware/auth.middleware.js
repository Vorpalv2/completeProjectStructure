const authenticationCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect(`/`);
  }
};

const unauthenticationCheck = (req, res, next) => {
  if (req.isUnauthenticated()) {
    next();
  } else {
    res.redirect(`/`);
  }
};

export { authenticationCheck, unauthenticationCheck };
