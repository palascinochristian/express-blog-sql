const ValidationId = (req, res, next) => {
  if (isNaN(req.params.id)) {
    return res.sendStatus(400);
  }
  next();
};

module.exports = ValidationId;
