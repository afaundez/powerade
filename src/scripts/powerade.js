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
        size: (this.options.border.includes('bottom') ? 1 : 0) +
          this.axis.y.cardinality +
          (this.options.border.includes('top') ? 1 : 0),
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
      const wrapper = document.createElement('div');
      wrapper.classList.add('container');
      const visualization = document.createElement('div');
      visualization.classList.add('visualization');
      const yHeader = document.createElement('div');
      yHeader.classList.add('y-header');
      const yLabel = document.createElement('span');
      yLabel.classList.add('y-label');
      yHeader.appendChild(yLabel);
      const xHeader = document.createElement('div');
      xHeader.classList.add('x-header');
      const xLabel = document.createElement('span');
      xLabel.classList.add('x-label');
      xHeader.appendChild(xLabel);
      const zLegend = document.createElement('div');
      zLegend.classList.add('z-legend');
      const map = document.createElement('div');
      map.classList.add('map');
      map.setAttribute('style',
        `grid-template-columns: repeat(${this.grid.x.size}, 1fr); ` +
        `grid-template-rows: repeat(${this.grid.y.size}, 1fr);`);
      visualization.appendChild(yHeader);
      visualization.appendChild(xHeader);
      visualization.appendChild(zLegend);
      visualization.appendChild(map);
      for(let row = this.grid.y.last; row >= this.grid.y.first; row--) {
        for(let col = this.grid.x.first; col <= this.grid.x.last; col++) {
          const dropzone = document.createElement('div');
          dropzone.classList.add(...this.dropzoneClasses(col, row));
          dropzone.setAttribute('data-drop-target', `${col}-${row}`);
          map.appendChild(dropzone);
        }
      }
      wrapper.appendChild(visualization);
      target.appendChild(wrapper);
      target.classList.add(...this.options.style);
    }
  }

  load(target = this.target, elements = this.elements, options = this.options) {
    const view = target.querySelector('.visualization');
    for (let attribute in options.dataset) {
      const value = options.dataset[attribute];
      view.setAttribute(`data-${attribute}`, value);
    }
    for (let axis of ['x', 'y']) {
      const header = view.querySelector(`.${axis}-label`);
      header.textContent = this.axis[axis].label;
      view.setAttribute(`data-dimension-${axis}`, header.textContent);
    }
    const mapAxis = function (axis) {
      const value = this.element.values[this.axis[axis].label];
      return typeof(parseInt(value)) === 'number' ? value : 'unknown';
    };
    const outDropzone = view.querySelector('[data-drop-target="out"]');
    for (let [i, element] of elements.entries()) {
      const [xValue, yValue, zValue] = ['x', 'y', 'z'].map(mapAxis, {
        element: element,
        axis: this.axis
      });
      const dropzoneSelector = `[data-drop-target="${xValue}-${yValue}"]`;
      const dropzone = view.querySelector(dropzoneSelector) || outDropzone;
      if (!dropzone) { continue; }
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

  dropzoneClasses(column, row) {
    const classes = [];
    if (this.options.border.includes('bottom') &&
        (row === this.grid.y.first)) {
      classes.push('extra-bottom');
    }
    if (this.options.border.includes('left') &&
        (column === this.grid.x.first)) {
      classes.push('extra-left');
    }
    if ((1 <= row && row <= this.axis.y.cardinality) &&
        (1 <= column && column <= this.axis.x.cardinality)) {
      switch (row) {
        case 1: classes.push('border-bottom'); break;
        case this.axis.y.cardinality:
        classes.push('border-top'); break;
        case this.axis.y.cardinality / 2:
        classes.push('axis-top'); break;
        case (this.axis.y.cardinality / 2) + 1:
        classes.push('axis-bottom'); break;
      }
      switch (column) {
        case 1: classes.push('border-left'); break;
        case this.axis.x.cardinality:
        classes.push('border-right'); break;
        case this.axis.x.cardinality / 2:
        classes.push('axis-right'); break;
        case (this.axis.x.cardinality / 2) + 1:
        classes.push('axis-left'); break;
      }
    }
    if (this.options.border.includes('top') &&
        (row === this.grid.y.last)) {
      classes.push('extra-top');
    }
    if (this.options.border.includes('right') &&
        (column === this.grid.x.last)) {
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
