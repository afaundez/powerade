const DEFAULT_OPTIONS = {
 dimensions: {
   x: { cardinality: 4, label: 'x-dimension'},
   y: { cardinality: 4, label: 'y-dimension'},
   z: { cardinality: 4, label: 'z-dimension'}
 },
 border: ['left', 'bottom', 'top', 'right'],
 display: {
   label: true,
   avatar: true,
   missing_avatar: 'https://upload.wikimedia.org' +
     '/wikipedia/commons/2/2a/Flag_of_None.svg'
 },
 dataset: {},
 handlers: {
   drop(dropzone, dragged) {}
 }
};

export class Powerade {

  static get DEFAULT_OPTIONS(){
    return DEFAULT_OPTIONS;
  }

  constructor(target, elements, options) {
    this.target = target;
    this.elements = elements;
    const merge = (target, source) => {
      // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
      for (let key of Object.keys(source)) {
        if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]));
      }

      // Join `target` and modified `source`
      if (source instanceof Array) { target = source; }
      else { Object.assign(target || {}, source); }
      return target;
    };
    this.options = merge(Powerade.DEFAULT_OPTIONS, options);
  }

  clean(target = this.target) {
    if (target != null) { return ((() => {
      const result = [];
      while (target.firstChild) {
        result.push(target.firstChild.remove());
      }
      return result;
    })()); }
  }

  build(target = this.target) {
    if (target != null) {
      let column, dropzone, dropzone_id, row;
      let asc1, end1;
      let asc2, end2;
      const y_header = document.createElement('th');
      y_header.setAttribute('colspan', this.axis_attribute_for('x', 'cardinality'));
      y_header.setAttribute('id', 'dimension-y');
      y_header.setAttribute('class', 'y-label');
      y_header.append('y-axis');
      const y_header_row = document.createElement('tr');
      y_header_row.appendChild(document.createElement('th'));
      y_header_row.appendChild(y_header);
      const thead = document.createElement('thead');
      thead.appendChild(y_header_row);
      const tbody = document.createElement('tbody');
      const table = document.createElement('table');
      table.setAttribute('id', 'powerade-view');
      table.classList.add('powerade');
      table.appendChild(thead);
      const first_column = this.grid_attribute_for('y', 'first');
      const last_column = this.grid_attribute_for('y', 'last');
      if (this.options.border.includes('top')) {
        let asc, end;
        const extra_top_row = document.createElement('tr');
        for (column = first_column, end = last_column, asc = first_column <= end; asc ? column <= end : column >= end; asc ? column++ : column--) {
          dropzone = document.createElement('td');
          dropzone_id = `i-${this.grid_attribute_for('x', 'last')}-${column}`;
          dropzone.setAttribute('id', dropzone_id);
          row = this.grid_attribute_for('x', 'last');
          dropzone.setAttribute('class', this.dropzone_classes_for(row, column));
          dropzone.setAttribute('data-drop-target', true);
          extra_top_row.appendChild(dropzone);
        }
        tbody.appendChild(extra_top_row);
      }
      const x_header_row = document.createElement('tr');
      for (column = first_column, end1 = last_column, asc1 = first_column <= end1; asc1 ? column <= end1 : column >= end1; asc1 ? column++ : column--) {
        dropzone = document.createElement('td');
        dropzone_id = `i-${this.axis_attribute_for('x', 'cardinality')}-${column}`;
        dropzone.setAttribute('id', dropzone_id);
        row = this.axis_attribute_for('x', 'cardinality');
        dropzone.setAttribute('class', this.dropzone_classes_for(row, column));
        dropzone.setAttribute('data-drop-target', true);
        x_header_row.appendChild(dropzone);
      }
      const x_header = document.createElement('th');
      x_header.setAttribute('rowspan', this.axis_attribute_for('y', 'cardinality'));
      x_header.setAttribute('id', 'dimension-x');
      x_header.setAttribute('class', 'center-align');
      x_header.append('x-axis');
      x_header_row.appendChild(x_header);
      tbody.appendChild(x_header_row);
      for (row = 1, end2 = this.axis_attribute_for('x', 'cardinality'), asc2 = 1 <= end2; asc2 ? row <= end2 : row >= end2; asc2 ? row++ : row--) {
        var asc3, end3;
        const non_first_row = document.createElement('tr');
        for (column = first_column, end3 = last_column, asc3 = first_column <= end3; asc3 ? column <= end3 : column >= end3; asc3 ? column++ : column--) {
          dropzone = document.createElement('td');
          const current_row = this.axis_attribute_for('x', 'cardinality') - row;
          dropzone_id = `i-${current_row}-${column}`;
          dropzone.setAttribute('id', dropzone_id);
          const dropzone_classes = this.dropzone_classes_for(current_row, column);
          dropzone.setAttribute('class', dropzone_classes);
          dropzone.setAttribute('data-drop-target', true);
          non_first_row.appendChild(dropzone);
        }
        tbody.appendChild(non_first_row);
      }
      table.appendChild(tbody);
      const outside_dropzone = document.createElement('div');
      outside_dropzone.setAttribute('id', 'powerade-outside');
      outside_dropzone.classList.add('powerade');
      outside_dropzone.setAttribute('data-drop-target', true);
      target.appendChild(outside_dropzone);
      target.appendChild(table);
    }
  }

  load(target = this.target, elements = this.elements, options = this.options) {
    let dimension_label;
    const view = target.querySelector('table#powerade-view');
    const outside_dropzone = target.querySelector("#powerade-outside");
    for (let attribute in options.dataset) {
      const value = options.dataset[attribute];
      view.setAttribute(`data-${attribute}`, value);
    }
    for (let axis of ['x', 'y']) {
      dimension_label = this.axis_attribute_for(axis, 'label');
      view.setAttribute(`data-dimension-${axis}`, dimension_label);
      const header = view.querySelector(`th#dimension-${axis}`);
      header.textContent = dimension_label;
    }
    const mapAxis = function (axis) {
      const values = element.values;
      dimension_label = this.axis_attribute_for(axis, 'label');
      return values[dimension_label] || 'unknown';
    };
    for (var element of elements) {
      const [x_value, y_value, z_value] = ['x', 'y', 'z'].map(mapAxis, this);
      const dropzone_id = ['i', x_value, y_value].join('-');
      var left;
      const dropzone = (left = view.querySelector(`td#${dropzone_id}`)) != null ? left : outside_dropzone;
      const draggable = document.createElement('div');
      draggable.setAttribute('id', element.id);
      draggable.setAttribute('draggable', true);
      draggable.setAttribute('class', `item z-gradient-${z_value}`);
      if (this.options.display.avatar && (element.avatar != null)) {
        const draggable_avatar = document.createElement('img');
        draggable_avatar.setAttribute('src', element.avatar);
        const missing_avatar = this.options.display.missing_avatar;
        draggable_avatar.setAttribute('onerror', `this.src='${missing_avatar}'`);
        draggable.appendChild(draggable_avatar);
      }
      const draggable_label = document.createElement('span');
      draggable_label.append(element.label);
      if (this.options.display.label) { draggable.appendChild(draggable_label); }
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
      const dragged_id = event.dataTransfer.getData('text');
      const dragged_element = document.getElementById(dragged_id);
      this.classList.remove('drag-enter');
      if (dragged_element.parentNode === this) { return; }
      handlers.drop(event.target, dragged_element);
      dragged_element.parentNode.removeChild(dragged_element);
      this.appendChild(dragged_element);
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

  dropzone_classes_for(row, column) {
    const classes = [];
    if (this.options.border.includes('bottom') &&
        (row === this.grid_attribute_for('x', 'first'))) {
      classes.push('extra-bottom');
    }
    if (this.options.border.includes('left') &&
        (column === this.grid_attribute_for('y', 'first'))) {
      classes.push('extra-left');
    }
    if ((1 <= row && row <= this.axis_attribute_for('x', 'cardinality')) &&
        (1 <= column && column <= this.axis_attribute_for('y', 'cardinality'))) {
      switch (row) {
        case 1: classes.push('border-bottom'); break;
        case this.axis_attribute_for('x', 'cardinality'):
        classes.push('border-top'); break;
        case this.axis_attribute_for('x', 'cardinality') / 2:
        classes.push('axis-top'); break;
        case (this.axis_attribute_for('x', 'cardinality') / 2) + 1:
        classes.push('axis-bottom'); break;
      }
      switch (column) {
        case 1: classes.push('border-left'); break;
        case this.axis_attribute_for('y', 'cardinality'):
        classes.push('border-right'); break;
        case this.axis_attribute_for('y', 'cardinality') / 2:
        classes.push('axis-right'); break;
        case (this.axis_attribute_for('y', 'cardinality') / 2) + 1:
        classes.push('axis-left'); break;
      }
    }
    if (this.options.border.includes('top') &&
        (row === this.grid_attribute_for('x', 'last'))) {
      classes.push('extra-top');
    }
    if (this.options.border.includes('right') &&
        (column === this.grid_attribute_for('y', 'last'))) {
      classes.push('extra-right');
    }
    return classes.join(' ');
  }

  grid_attribute_for(axis, attribute) {
    const grid = {
      x: {
        size: (this.options.border.includes('left') ? 1 : 0) +
          this.axis_attribute_for('x', 'cardinality') +
          (this.options.border.includes('right') ? 1 : 0),
        first: this.options.border.includes('left') ? 0 : 1,
        last: this.axis_attribute_for('x', 'cardinality') +
          (this.options.border.includes('right') ? 1 : 0)
      },
      y: {
        size: (this.options.border.includes('top') ? 1 : 0) +
          this.axis_attribute_for('y', 'cardinality') +
          (this.options.border.includes('bottom') ? 1 : 0),
        first: this.options.border.includes('bottom') ? 0 : 1,
        last: this.axis_attribute_for('y', 'cardinality') +
          (this.options.border.includes('top') ? 1 : 0)
      }
    };
    return grid[axis][attribute];
  }

  axis_attribute_for(axis, attribute) {
    return this.options.dimensions[axis][attribute];
  }
}
