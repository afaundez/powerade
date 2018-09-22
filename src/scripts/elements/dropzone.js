const updateDropzoneGrid = dropzone => {
  const nearestSquare = n => Math.pow(Math.pow(n, 0.5) + 1 | 0, 2);
  const size = Math.pow(nearestSquare(dropzone.childElementCount), 0.5);
  dropzone.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  dropzone.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
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
  dropzone.removeChild(draggable);
  updateDropzoneGrid(dropzone);
}

export function insert(draggable, dropzone) {
  dropzone.appendChild(draggable);
  updateDropzoneGrid(dropzone);
}

export function find(row, column, target=document) {
  const dropzoneSelector = `[data-drop-target="${row}-${column}"]`;
  return target.querySelector(dropzoneSelector);
}

export function build(grid, axis, col, row, options) {
  const handleDragEnter = event => {
    event.currentTarget.classList.add('drag-enter');
  };
  const handleDragOver = event => {
    event.preventDefault();
  };
  const handleDragLeave = function(event) {
    event.currentTarget.classList.remove('drag-enter');
  };

  const handleDragDrop = function(event) {
    event.preventDefault();
    const targetDropzone = event.currentTarget;
    targetDropzone.classList.remove('drag-enter');
    const draggableId = event.dataTransfer.getData('text');
    const draggable = document.getElementById(draggableId);
    const currentDropzone = draggable.parentNode;
    if (currentDropzone === targetDropzone) { return; }
    remove(draggable, currentDropzone);
    insert(draggable, targetDropzone);
    options.handlers.drop(targetDropzone, draggable);
  };
  const dropzone = document.createElement('div');
  dropzone.classList.add(...types(grid, axis, options.borders, col, row));
  dropzone.setAttribute('data-drop-target', `${col}-${row}`);
  dropzone.addEventListener('dragenter', handleDragEnter);
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDragDrop);
  return dropzone;
}
