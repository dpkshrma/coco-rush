export class HTTPError extends Error {
  constructor({ name, message, status = 500 }) {
    super(message);
    this.name = name;
    this.status = status;
    this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}
