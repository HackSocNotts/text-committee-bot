export default class NotFoundError extends Error {
  constructor(m: string) {
    super(m);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
