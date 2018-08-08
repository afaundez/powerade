import * as Config from './config.js';

export class Powerade {
  constructor(target, elements, options = {}) {
    this.target = target;
    this.elements = elements;
    this.options = this.merge(Config.DEFAULTS, options);
    this.axis = this.options.dimensions;
    this.grid = {
      x: {
        size: (this.options.border.includes('left') ? 1 : 0) +
          this.axis.x.cardinality +
          (this.options.border.includes('right') ? 1 : 0),
        first: this.options.border.includes('left') ? 0 : 1,
        last: this.axis.x.cardinality +
          (this.options.border.includes('right') ? 1 : 0)
      },
      y: {
        size: (this.options.border.includes('top') ? 1 : 0) +
          this.axis.y.cardinality +
          (this.options.border.includes('bottom') ? 1 : 0),
        first: this.options.border.includes('bottom') ? 0 : 1,
        last: this.axis.y.cardinality +
          (this.options.border.includes('top') ? 1 : 0)
      }
    };
  }

  clean(target = this.target) {
    if (target !== null) {
      const result = [];
      while (target.firstChild) {
        result.push(target.firstChild.remove());
      }
      return result;
    }
  }

  build(target = this.target) {
    if (target !== null) {
      const yHeader = document.createElement('th');
      yHeader.setAttribute('colspan', this.axis.x.cardinality);
      yHeader.id = 'dimension-y';
      yHeader.classList.add('y-label');
      const outDropzone = document.createElement('td');
      outDropzone.setAttribute('data-drop-target', 'out');
      outDropzone.setAttribute('colspan', this.grid.x.size);
      const yHeaderRow = document.createElement('tr');
      yHeaderRow.appendChild(document.createElement('th'));
      yHeaderRow.appendChild(yHeader);
      const thead = document.createElement('thead');
      thead.appendChild(outDropzone);
      thead.appendChild(yHeaderRow);
      const tbody = document.createElement('tbody');
      const table = document.createElement('table');
      table.appendChild(thead);
      const firstColumn = this.grid.y.first;
      const lastColumn = this.grid.y.last;
      if (this.options.border.includes('top')) {
        const extraTopRow = document.createElement('tr');
        for (let column = firstColumn; column <= lastColumn; column++) {
          const row = this.grid.x.last;
          const dropzone = document.createElement('td');
          dropzone.classList.add(...this.dropzoneClasses(row, column));
          dropzone.setAttribute('data-drop-target', `${row}-${column}`);
          extraTopRow.appendChild(dropzone);
        }
        tbody.appendChild(extraTopRow);
      }
      const xHeaderRow = document.createElement('tr');
      for (let column = firstColumn; column <= lastColumn; column++) {
        const row = this.axis.x.cardinality;
        const dropzone = document.createElement('td');
        dropzone.classList.add(...this.dropzoneClasses(row, column));
        dropzone.setAttribute('data-drop-target', `${row}-${column}`);
        xHeaderRow.appendChild(dropzone);
      }
      const xHeader = document.createElement('th');
      xHeader.setAttribute('rowspan', this.axis.y.cardinality);
      xHeader.id = 'dimension-x';
      xHeaderRow.appendChild(xHeader);
      tbody.appendChild(xHeaderRow);
      for (let row = 1; row <= this.axis.x.cardinality; row++) {
        const nonFirstRow = document.createElement('tr');
        for (let column = firstColumn; column <= lastColumn; column++) {
          const currentRow = this.axis.x.cardinality - row;
          const dropzone = document.createElement('td');
          const dropzoneClasses = this.dropzoneClasses(currentRow, column);
          dropzone.classList.add(...dropzoneClasses);
          dropzone.setAttribute('data-drop-target', `${currentRow}-${column}`);
          nonFirstRow.appendChild(dropzone);
        }
        tbody.appendChild(nonFirstRow);
      }
      table.appendChild(tbody);
      target.appendChild(table);
      target.classList.add(...this.options.style);
    }
  }

  load(target = this.target, elements = this.elements, options = this.options) {
    const view = target.querySelector('table');
    for (let attribute in options.dataset) {
      const value = options.dataset[attribute];
      view.setAttribute(`data-${attribute}`, value);
    }
    for (let axis of ['x', 'y']) {
      const header = view.querySelector(`th#dimension-${axis}`);
      header.textContent = this.axis[axis].label;
      view.setAttribute(`data-dimension-${axis}`, header.textContent);
    }
    const mapAxis = function (axis) {
      const value = this.element.values[this.axis[axis].label];
      return typeof(parseInt(value)) === 'number' ? value : 'unknown';
    };
    const outDropzone = target.querySelector('[data-drop-target="out"]');
    for (let [i, element] of elements.entries()) {
      const [xValue, yValue, zValue] = ['x', 'y', 'z'].map(mapAxis, {
        element: element,
        axis: this.axis
      });
      const dropzoneSelector = `[data-drop-target="${xValue}-${yValue}"]`;
      const dropzone = view.querySelector(dropzoneSelector) || outDropzone;
      const draggable = document.createElement('div');
      draggable.id = element.id || `pw-draggable-${i}`;
      draggable.setAttribute('draggable', true);
      draggable.setAttribute('data-z-gradient', zValue);
      if (this.options.display.avatar && (element.avatar !== null)) {
        const dragableAvatar = document.createElement('img');
        const missingAvatar = this.options.display.missingAvatar;
        dragableAvatar.setAttribute('src', element.avatar || missingAvatar);
        const onerrorAvatar = this.options.display.onerrorAvatar;
        dragableAvatar.setAttribute('onerror', `this.src='${onerrorAvatar}'`);
        draggable.appendChild(dragableAvatar);
      }
      const draggableLabel = document.createElement('span');
      draggableLabel.append(element.label);
      if (this.options.display.label) { draggable.appendChild(draggableLabel); }
      dropzone.appendChild(draggable);
    }
    this.interact();
  }

  interact(handlers = this.options.handlers) {
    const handleDragStart = function(event) {
      event.dataTransfer.setData('text', this.id);
    };
    const handleDragEnterLeave = function(event) {
      switch (event.type) {
        case 'dragenter': this.classList.add('drag-enter'); break;
        default: this.classList.remove('drag-enter');
      }
    };
    const handleOverDrop = function(event) {
      event.preventDefault();
      if (event.type !== 'drop') { return; }
      const draggedId = event.dataTransfer.getData('text');
      const dragged = document.getElementById(draggedId);
      this.classList.remove('drag-enter');
      if (dragged.parentNode === this) { return; }
      handlers.drop(event.target, dragged);
      dragged.parentNode.removeChild(dragged);
      this.appendChild(dragged);
    };
    for (let draggable of this.target.querySelectorAll('[draggable]')) {
      draggable.addEventListener('dragstart', handleDragStart);
    }
    for (let dropzone of this.target.querySelectorAll('[data-drop-target]')) {
      dropzone.addEventListener('dragover', handleOverDrop);
      dropzone.addEventListener('drop', handleOverDrop);
      dropzone.addEventListener('dragenter', handleDragEnterLeave);
      dropzone.addEventListener('dragleave', handleDragEnterLeave);
    }
  }

  dropzoneClasses(row, column) {
    const classes = [];
    if (this.options.border.includes('bottom') &&
        (row === this.grid.x.first)) {
      classes.push('extra-bottom');
    }
    if (this.options.border.includes('left') &&
        (column === this.grid.y.first)) {
      classes.push('extra-left');
    }
    if ((1 <= row && row <= this.axis.x.cardinality) &&
        (1 <= column && column <= this.axis.y.cardinality)) {
      switch (row) {
        case 1: classes.push('border-bottom'); break;
        case this.axis.x.cardinality:
        classes.push('border-top'); break;
        case this.axis.x.cardinality / 2:
        classes.push('axis-top'); break;
        case (this.axis.x.cardinality / 2) + 1:
        classes.push('axis-bottom'); break;
      }
      switch (column) {
        case 1: classes.push('border-left'); break;
        case this.axis.y.cardinality:
        classes.push('border-right'); break;
        case this.axis.y.cardinality / 2:
        classes.push('axis-right'); break;
        case (this.axis.y.cardinality / 2) + 1:
        classes.push('axis-left'); break;
      }
    }
    if (this.options.border.includes('top') &&
        (row === this.grid.x.last)) {
      classes.push('extra-top');
    }
    if (this.options.border.includes('right') &&
        (column === this.grid.y.last)) {
      classes.push('extra-right');
    }
    return classes;
  }

  merge(target, source) {
    for (let key of Object.keys(source)) {
      if (source[key] instanceof Object) {
        Object.assign(source[key], this.merge(target[key], source[key]));
      }
    }
    if (source instanceof Array) { target = source; }
    else { Object.assign(target || {}, source); }
    return target;
  }
}
