import * as Dropzone from './dropzone.js';

export function build(grid, axis, options) {
  const dropzones = document.createElement('div');
  dropzones.className = 'dropzones';
  dropzones.style.gridTemplateColumns = `repeat(${grid.x.size}, 1fr)`;
  dropzones.style.gridTemplateRows = `repeat(${grid.y.size}, 1fr)`;
  for(let row = grid.y.last; row >= grid.y.first; row--) {
    for(let col = grid.x.first; col <= grid.x.last; col++) {
      const dropzone = Dropzone.build(grid, axis, col, row, options);
      dropzones.appendChild(dropzone);
    }
  }
  const map = document.createElement('div');
  map.className = 'map';
  map.appendChild(dropzones);
  return map;
}
