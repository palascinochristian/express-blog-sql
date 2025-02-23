const notFound = (req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: "La pagina non esiste",
  });
};

module.exports = notFound;
