const updateDropzoneDraggables = draggables => {
  const nearestSquare = n => Math.pow(Math.pow(n, 0.5) + 1 | 0, 2);
  const size = Math.pow(nearestSquare(draggables.childElementCount), 0.5);
  draggables.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  draggables.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  return;
};

const types = (grid, axis, borders, column, row) => {
  const classes = [];
  if (borders.includes('bottom') &&
  (row === grid.y.first)) {
    classes.push('extra-bottom');
  }
  if (borders.includes('left') &&
  (column === grid.x.first)) {
    classes.push('extra-left');
  }
  if ((1 <= row && row <= axis.y.cardinality) &&
  (1 <= column && column <= axis.x.cardinality)) {
    switch (row) {
      case 1: classes.push('border-bottom'); break;
      case axis.y.cardinality:
      classes.push('border-top'); break;
      case axis.y.cardinality / 2:
      classes.push('axis-top'); break;
      case (axis.y.cardinality / 2) + 1:
      classes.push('axis-bottom'); break;
    }
    switch (column) {
      case 1: classes.push('border-left'); break;
      case axis.x.cardinality:
      classes.push('border-right'); break;
      case axis.x.cardinality / 2:
      classes.push('axis-right'); break;
      case (axis.x.cardinality / 2) + 1:
      classes.push('axis-left'); break;
    }
  }
  if (borders.includes('top') &&
  (row === grid.y.last)) {
    classes.push('extra-top');
  }
  if (borders.includes('right') &&
  (column === grid.x.last)) {
    classes.push('extra-right');
  }
  return classes;
};

export function remove(draggable, dropzone) {
  const draggables = dropzone.querySelector('.draggables');
  draggables.removeChild(draggable);
  updateDropzoneDraggables(draggables);
}

export function insert(draggable, dropzone) {
  const draggables = dropzone.querySelector('.draggables');
  draggables.appendChild(draggable);
  updateDropzoneDraggables(draggables);
}

export function find(row, column, target=document) {
  const dropzoneSelector = `[data-drop-target="${row}-${column}"]`;
  return target.querySelector(dropzoneSelector);
}

const handleDragEnter = event => {
  event.preventDefault();
  const dropzone = event.currentTarget.closest('.dropzone');
  dropzone.classList.add('drag-enter');
};
const handleDragOver = event => {
  event.preventDefault();
  event.currentTarget.closest('.dropzones').classList.add('dragging');
};
const handleDragLeave = event => {
  const dropzone = event.currentTarget.closest('.dropzone');
  dropzone.classList.remove('drag-enter');
};

const handleDragDrop = customAction => {
  return event => {
    event.preventDefault();
    const targetDropzone = event.currentTarget;
    targetDropzone.classList.remove('drag-enter');
    const draggableId = event.dataTransfer.getData('text');
    const draggable = document.getElementById(draggableId);
    const currentDropzone = draggable.closest('.dropzone');
    if (currentDropzone === targetDropzone) { return; }
    remove(draggable, currentDropzone);
    insert(draggable, targetDropzone);
    customAction(targetDropzone, draggable);
  };
};

export function build(grid, axis, col, row, options) {
  const draggables = document.createElement('div');
  draggables.className = 'draggables';
  const dropzone = document.createElement('div');
  dropzone.className = 'dropzone';
  dropzone.classList.add(...types(grid, axis, options.borders, col, row));
  dropzone.setAttribute('data-drop-target', `${col}-${row}`);
  dropzone.addEventListener('dragenter', handleDragEnter);
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDragDrop(options.handlers.drop));
  dropzone.appendChild(draggables);
  return dropzone;
}
