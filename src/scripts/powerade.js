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
      yHeader.append('y-axis');
      const outDropzone = document.createElement('td');
      outDropzone.id = 'pw-dropzone-outside';
      outDropzone.setAttribute('data-drop-target', '');
      outDropzone.setAttribute('colspan', this.grid.x.size);
      const yHeaderRow = document.createElement('tr');
      yHeaderRow.appendChild(document.createElement('th'));
      yHeaderRow.appendChild(yHeader);
      const thead = document.createElement('thead');
      thead.appendChild(outDropzone);
      thead.appendChild(yHeaderRow);
      const tbody = document.createElement('tbody');
      const table = document.createElement('table');
      table.id = 'powerade-view';
      table.appendChild(thead);
      const firstColumn = this.grid.y.first;
      const lastColumn = this.grid.y.last;
      if (this.options.border.includes('top')) {
        const extraTopRow = document.createElement('tr');
        for (let column = firstColumn; column <= lastColumn; column++) {
          const dropzone = document.createElement('td');
          const dropzoneId = `pw-dropzone-${this.grid.x.last}-${column}`;
          dropzone.id = dropzoneId;
          const row = this.grid.x.last;
          dropzone.classList.add(...this.dropzoneClasses(row, column));
          dropzone.setAttribute('data-drop-target', '');
          extraTopRow.appendChild(dropzone);
        }
        tbody.appendChild(extraTopRow);
      }
      const xHeaderRow = document.createElement('tr');
      for (let column = firstColumn; column <= lastColumn; column++) {
        const dropzone = document.createElement('td');
        const dropzoneId = `pw-dropzone-${this.axis.x.cardinality}-${column}`;
        dropzone.id = dropzoneId;
        const row = this.axis.x.cardinality;
        dropzone.classList.add(...this.dropzoneClasses(row, column));
        dropzone.setAttribute('data-drop-target', '');
        xHeaderRow.appendChild(dropzone);
      }
      const xHeader = document.createElement('th');
      xHeader.setAttribute('rowspan', this.axis.y.cardinality);
      xHeader.id = 'dimension-x';
      xHeader.append('x-axis');
      xHeaderRow.appendChild(xHeader);
      tbody.appendChild(xHeaderRow);
      for (let row = 1; row <= this.axis.x.cardinality; row++) {
        const nonFirstRow = document.createElement('tr');
        for (let column = firstColumn; column <= lastColumn; column++) {
          const dropzone = document.createElement('td');
          const currentRow = this.axis.x.cardinality - row;
          const dropzoneId = `pw-dropzone-${currentRow}-${column}`;
          dropzone.id = dropzoneId;
          const dropzoneClasses = this.dropzoneClasses(currentRow, column);
          dropzone.classList.add(...dropzoneClasses);
          dropzone.setAttribute('data-drop-target', true);
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
    const view = target.querySelector('table#powerade-view');
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
      const value = element.values[this.axis[axis].label];
      return typeof(value) === 'number' ? value : 'unknown';
    };
    const outDropzone = target.querySelector("#pw-dropzone-outside");
    for (var [i, element] of elements.entries()) {
      const [x_value, y_value, z_value] = ['x', 'y', 'z'].map(mapAxis, this);
      const dropzoneId = ['pw-dropzone', x_value, y_value].join('-');
      const dropzone = view.querySelector(`td#${dropzoneId}`) || outDropzone;
      const draggable = document.createElement('div');
      draggable.id = element.id || `pw-draggable-${i}`;
      draggable.setAttribute('draggable', true);
      draggable.setAttribute('data-z-gradient', z_value);
      if (this.options.display.avatar && (element.avatar !== null)) {
        const dragableAvatar = document.createElement('img');
        const missingAvatar = this.options.display.missing_avatar;
        dragableAvatar.setAttribute('src', element.avatar || missingAvatar);
        const onerrorAvatar = this.options.display.onerror_avatar;
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
