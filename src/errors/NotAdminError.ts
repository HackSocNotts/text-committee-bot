export default class NotAdminError extends Error {
  constructor(m: string) {
    super(m);

    Object.setPrototypeOf(this, NotAdminError.prototype);
  }
}
