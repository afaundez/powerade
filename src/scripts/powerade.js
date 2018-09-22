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
      const visualization = document.createElement('div');
      visualization.classList.add('visualization');
      visualization.appendChild(Axis.buildHeader('y'));
      visualization.appendChild(Axis.buildHeader('x'));
      visualization.appendChild(Axis.buildLegend('z', this.grid));
      const map = Map.build(this.grid, this.axes, this.options);
      visualization.appendChild(map);
      const powerade = document.createElement('div');
      powerade.classList.add('powerade');
      powerade.appendChild(visualization);
      powerade.classList.add(...this.options.style);
      target.appendChild(powerade);
    }
  }

  load(target = this.target, elements = this.elements, options = this.options) {
    const view = target.querySelector('.visualization');
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
    const outDropzone = view.querySelector('[data-drop-target="out"]');
    for (let [i, element] of elements.entries()) {
      const [xValue, yValue, zValue] = ['x', 'y', 'z'].map(mapAxis, {
        element: element,
        axes: this.axes
      });
      const dropzone = Dropzone.find(xValue, yValue, view) || outDropzone;
      if (!dropzone) { continue; }
      const draggable = Draggable.build(element.id || `pw-figure-${i}`,
        xValue, yValue, zValue, element, options);
      Dropzone.insert(draggable, dropzone);
    }
  }
}
