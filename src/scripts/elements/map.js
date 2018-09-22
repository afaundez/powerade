import * as Dropzone from './dropzone.js';

export function build(grid, axis, options) {
  const map = document.createElement('div');
  map.classList.add('map');
  map.style.gridTemplateColumns = `repeat(${grid.x.size}, 1fr)`;
  map.style.gridTemplateRows = `repeat(${grid.y.size}, 1fr)`;
  for(let row = grid.y.last; row >= grid.y.first; row--) {
    for(let col = grid.x.first; col <= grid.x.last; col++) {
      const dropzone = Dropzone.build(grid, axis, col, row, options);
      map.appendChild(dropzone);
    }
  }
  return map;
}
