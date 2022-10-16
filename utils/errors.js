/* eslint-disable max-classes-per-file */

class ServerError extends Error {
  constructor(message = 'На сервере произошла ошибка') {
    super(message);
    this.name = 'ServerError';
    this.statusCode = 500;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class IncorrectDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IncorrectDataError';
    this.statusCode = 400;
  }
}

module.exports = { ServerError, NotFoundError, IncorrectDataError };
