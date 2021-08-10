export default class Cache {
  constructor(key) {
    this.key = key;
  }

  get() {
    const cache = JSON.parse(localStorage.getItem(this.key));
    if (cache?.expirationTime > Date.now()) {
      return cache;
    }

    return null;
  }

  set(data, expiration = 60 * 60 * 1000) {
    localStorage.setItem(
      this.key,
      JSON.stringify({
        data,
        expirationTime: Date.now() + expiration,
      })
    );
  }
}
