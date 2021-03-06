import * as Config from './config.js';
import * as Utils from './utils.js';
import * as Axis from './elements/axis.js';
import * as Map from './elements/map.js';
import * as Draggable from './elements/draggable.js';
import * as Dropzone from './elements/dropzone.js';

export class Powerade {
  constructor(target, elements, options = {}) {
    this.target = target;
    this.elements = elements;
    this.options = Utils.merge(Config.DEFAULTS, options);
    this.axes = this.options.dimensions;
    this.grid = this.gridDimensions(this.axes, this.options.borders);
  }

  gridDimensions(axes, borders) {
    return {
      x: {
        size: (borders.includes('left') ? 1 : 0) +
          axes.x.cardinality +
          (borders.includes('right') ? 1 : 0),
        first: borders.includes('left') ? 0 : 1,
        last: axes.x.cardinality +
          (borders.includes('right') ? 1 : 0)
      },
      y: {
        size: (borders.includes('bottom') ? 1 : 0) +
          axes.y.cardinality +
          (borders.includes('top') ? 1 : 0),
        first: borders.includes('bottom') ? 0 : 1,
        last: axes.y.cardinality +
          (borders.includes('top') ? 1 : 0)
      },
      z: {
        size: axes.z.cardinality + 1,
        first: 0,
        last: axes.z.cardinality + 1
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
      const map = Map.build(this.grid, this.axes, this.options);
      const areas = document.createElement('div');
      areas.className = 'areas';
      areas.appendChild(Axis.buildHeader('y'));
      areas.appendChild(Axis.buildHeader('x'));
      areas.appendChild(Axis.buildLegend('z', this.grid));
      areas.appendChild(map);
      const layout = document.createElement('div');
      layout.className = 'layout';
      layout.appendChild(areas);
      const powerade = document.createElement('div');
      powerade.className = 'powerade';
      powerade.classList.add(...this.options.style);
      powerade.appendChild(layout);
      target.appendChild(powerade);
    }
  }

  load(target = this.target, elements = this.elements, options = this.options) {
    const view = target.querySelector('.powerade > .layout > .areas');
    for (let attribute in options.dataset) {
      const value = options.dataset[attribute];
      view.setAttribute(`data-${attribute}`, value);
    }
    for (let axis of ['x', 'y', 'z']) {
      Axis.update(axis, this.axes[axis].label, view);
    }
    const mapAxis = function (axis) {
      const value = this.element.values[this.axes[axis].label];
      return typeof(parseInt(value)) === 'number' ? value : 'unknown';
    };
    for (let [i, element] of elements.entries()) {
      const [xValue, yValue, zValue] = ['x', 'y', 'z'].map(mapAxis, {
        element: element,
        axes: this.axes
      });
      const dropzone = Dropzone.find(xValue, yValue, view);
      if (!dropzone) { continue; }
      const draggableId = element.id || `pw-figure-${i}`;
      const draggable = Draggable.build(draggableId, zValue, element, options);
      Dropzone.insert(draggable, dropzone);
    }
  }
}
