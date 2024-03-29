module.exports = (req, res, next) => {
  if (req.user.credit < 1) {
    return res.status(403).send({ error: "You must have credit!" });
  }
  next();
};
