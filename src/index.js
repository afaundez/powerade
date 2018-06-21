import { Powerade } from './powerade.js';

export function init(target, elements, options = {}) {
  if (!target) { return; }
  let powerade = new Powerade(target, elements, options);
  powerade.clean();
  powerade.build();
  powerade.load();
  return powerade;
}
