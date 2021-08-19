module.exports = (errors, res) => {
  res.status(422).json(errors);
};
