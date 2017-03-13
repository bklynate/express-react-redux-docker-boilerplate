function UnauthorizedError(message) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'UnauthorizedError';
  this.message = message;
  this.status = 401;
}

UnauthorizedError.prototype = Object.create(Error.prototype);
UnauthorizedError.prototype.constructor = UnauthorizedError;
module.exports = UnauthorizedError;
