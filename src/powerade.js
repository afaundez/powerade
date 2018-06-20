export class Powerade {

  constructor(target, elements, options) {
    this.target = target;
    this.elements = elements;
    this.options = options;
    this.parse();
    this.clean();
    this.build();
    this.load();
    this.interact(this.options['handlers']);
  }

  parse(options) {
    this.cardinality = {
      x: this.options['cardinality']['x'],
      y: this.options['cardinality']['y'],
      z: this.options['cardinality']['z']
    };
    return this.grid = {
      size: {
        x: (this.options['border'].includes('left') ? 1 : 0) + this.cardinality['x'] + (this.options['border'].includes('right') ? 1 : 0),
        y: (this.options['border'].includes('top') ? 1 : 0) + this.cardinality['y'] + (this.options['border'].includes('bottom') ? 1 : 0)
      },
      first: {
        x: (this.options['border'].includes('left') ? 0 : 1),
        y: (this.options['border'].includes('bottom') ? 0 : 1)
      },
      last: {
        x: this.cardinality['x'] + (this.options['border'].includes('right') ? 1 : 0),
        y: this.cardinality['y'] + (this.options['border'].includes('top') ? 1 : 0)
      },
      dimensions: {
        x: this.options['dimensions']['x'],
        y: this.options['dimensions']['y'],
        z: this.options['dimensions']['z']
      }
    };
  }

  clean() {
    if (this.target != null) {
      return (() => {
        const result = [];
        while (this.target.firstChild) {
          result.push(this.target.firstChild.remove());
        }
        return result;
      })();
    }
  }

  build() {
    if (this.target != null) {
      let column, td;
      let asc1, end1;
      let th = document.createElement('th');
      th.setAttribute('colspan', this.cardinality['x']);
      th.setAttribute('id', 'dimension-y');
      th.setAttribute('class', 'y-label');
      th.append('y-axis');
      let tr = document.createElement('tr');
      tr.appendChild(document.createElement('th'));
      tr.appendChild(th);
      const thead = document.createElement('thead');
      thead.appendChild(tr);
      const tbody = document.createElement('tbody');
      const table = document.createElement('table');
      table.setAttribute('id', 'powerade-view');
      table.classList.add('powerade');
      table.appendChild(thead);
      if (this.options['border'].includes('top')) {
        let asc, end;
        tr = document.createElement('tr');
        for (column = this.grid['first']['y'], end = this.grid['last']['y'], asc = this.grid['first']['y'] <= end; asc ? column <= end : column >= end; asc ? column++ : column--) {
          td = document.createElement('td');
          td.setAttribute('id', `i-${this.grid['last']['x']}-${column}`);
          td.setAttribute('class', this.cell_type_for(this.grid['last']['x'], column).join(' '));
          td.setAttribute('data-drop-target', true);
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
      tr = document.createElement('tr');
      for (column = this.grid['first']['y'], end1 = this.grid['last']['y'], asc1 = this.grid['first']['y'] <= end1; asc1 ? column <= end1 : column >= end1; asc1 ? column++ : column--) {
        td = document.createElement('td');
        td.setAttribute('id', `i-${this.cardinality['x']}-${column}`);
        td.setAttribute('class', this.cell_type_for(this.cardinality['x'], column).join(' '));
        td.setAttribute('data-drop-target', true);
        tr.appendChild(td);
      }
      th = document.createElement('th');
      th.setAttribute('rowspan', this.cardinality['y']);
      th.setAttribute('id', 'dimension-x');
      th.setAttribute('class', 'center-align');
      th.append('x-axis');
      tr.appendChild(th);
      tbody.appendChild(tr);
      for (let row = 1, end2 = this.cardinality['x'], asc2 = 1 <= end2; asc2 ? row <= end2 : row >= end2; asc2 ? row++ : row--) {
        var asc3, end3;
        tr = document.createElement('tr');
        for (column = this.grid['first']['y'], end3 = this.grid['last']['y'], asc3 = this.grid['first']['y'] <= end3; asc3 ? column <= end3 : column >= end3; asc3 ? column++ : column--) {
          td = document.createElement('td');
          td.setAttribute('id', `i-${this.cardinality['x'] - row}-${column}`);
          td.setAttribute('class', this.cell_type_for(this.cardinality['x'] - row, column).join(' '));
          td.setAttribute('data-drop-target', true);
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
      table.appendChild(tbody);
      const outside = document.createElement('div');
      outside.setAttribute('id', 'powerade-outside');
      outside.classList.add('powerade');
      outside.setAttribute('data-drop-target', true);
      this.target.appendChild(outside);
      this.target.appendChild(table);
    }
  }

  interact(handlers) {
    const draggables = this.target.querySelectorAll('[draggable]');
    const targets = this.target.querySelectorAll('[data-drop-target]');

    const handleDragStart = function(event) {
      event.dataTransfer.setData('text', this.id);
    };

    const handleDragEnterLeave = function(event) {
      if (event.type === 'dragenter') {
        return this.classList.add('drag-enter');
      } else {
        return this.classList.remove('drag-enter');
      }
    };

    const handleOverDrop = function(event) {
      event.preventDefault();
      if (event.type !== 'drop') { return; }
      const dragged_id = event.dataTransfer.getData('text');
      const dragged_element = document.getElementById(dragged_id);
      this.classList.remove('drag-enter');
      if (dragged_element.parentNode === this) { return; }
      handlers['drop'](event.target, dragged_element);
      dragged_element.parentNode.removeChild(dragged_element);
      this.appendChild(dragged_element);
    };

    for (let draggable of draggables) {
      draggable.addEventListener('dragstart', handleDragStart);
    }

    for (let target of targets) {
      target.addEventListener('dragover', handleOverDrop);
      target.addEventListener('drop', handleOverDrop);
      target.addEventListener('dragenter', handleDragEnterLeave);
      target.addEventListener('dragleave', handleDragEnterLeave);
    }
  }

  load() {
    const view = this.target.querySelector('table#powerade-view');
    for (let attribute in this.options['dataset']) {
      const value = this.options['dataset'][attribute];
      view.setAttribute(`data-${attribute}`, value);
    }
    const grid_dimensions = this.grid['dimensions'];
    for (var dimension of ['x', 'y']) {
      const dimension_label = grid_dimensions[dimension];
      view.setAttribute(`data-dimension-${dimension}`, dimension_label);
      const header = view.querySelector(`th#dimension-${dimension}`);
      header.textContent = dimension_label;
    }
    for (var element of this.elements) {
      const [x_value, y_value, z_value] = ['x', 'y', 'z'].map(function(generic_dimension) {
        const values = element['values'];
        dimension = grid_dimensions[generic_dimension];
        return values[dimension] || 'unknown';
      });
      const dropzone_id = ['i', x_value, y_value].join('-');
      let dropzone = this.target.querySelector(`td#${dropzone_id}`);
      if (dropzone == null) { dropzone = this.target.querySelector("#powerade-outside"); }
      const draggable = document.createElement('div');
      draggable.setAttribute('id', element['id']);
      draggable.setAttribute('draggable', true);
      draggable.setAttribute('class', `item z-gradient-${z_value}`);
      if (element['avatar'] != null) {
        const draggable_avatar = document.createElement('img');
        draggable_avatar.setAttribute('src', element['avatar']);
        draggable_avatar.setAttribute('onerror', "this.src='https://upload.wikimedia.org/wikipedia/commons/2/2a/Flag_of_None.svg'");
        draggable.appendChild(draggable_avatar);
      }
      const draggable_label = document.createElement('span');
      draggable_label.append(element['label']);
      if (!this.options['only-avatar']) { draggable.appendChild(draggable_label); }
      dropzone.appendChild(draggable);
    }
  }

  cell_type_for(x, y) {
    const classes = [];
    if (this.options['border'].includes('bottom') && (x === this.grid['first']['x'])) {
        classes.push('extra-bottom');
      }
    if (this.options['border'].includes('left') && (y === this.grid['first']['y'])) {
        classes.push('extra-left');
      }
    if ((__range__(1, this.cardinality['x'], true)).includes(x) && (__range__(1, this.cardinality['y'], true)).includes(y)) {
      switch (x) {
        case 1: classes.push('border-bottom'); break;
        case this.cardinality['x']: classes.push('border-top'); break;
        case this.cardinality['x'] / 2: classes.push('axis-top'); break;
        case (this.cardinality['x'] / 2) + 1: classes.push('axis-bottom'); break;
      }
      switch (y) {
        case 1: classes.push('border-left'); break;
        case this.cardinality['y']: classes.push('border-right'); break;
        case this.cardinality['y'] / 2: classes.push('axis-right'); break;
        case (this.cardinality['y'] / 2) + 1: classes.push('axis-left'); break;
      }
    }
    if (this.options['border'].includes('top') && (x === this.grid['last']['x'])) {
      classes.push('extra-top');
    }
    if (this.options['border'].includes('right') && (y === this.grid['last']['y'])) {
      classes.push('extra-right');
    }
    return classes;
  }
};

function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}
