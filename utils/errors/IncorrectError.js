module.exports = class IncorrectError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
