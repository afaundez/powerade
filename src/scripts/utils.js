export function merge(target, source) {
  let clone = Object.assign({}, target);
  for (let key of Object.keys(source)) {
    if (source[key] instanceof Object) {
      Object.assign(source[key], this.merge(clone[key], source[key]));
    }
  }
  if (source instanceof Array) { clone = source; }
  else { Object.assign(clone || {}, source); }
  return clone;
}
