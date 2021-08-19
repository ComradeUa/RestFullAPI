module.exports = (data, status, res) => {
  res.status(status).json(data);
};
