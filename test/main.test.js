/* globals expect */
const Powerade = require('../src/main');
const target = document.createElement('div');
import { elements, options }  from './fixtures/data/got.js';
const powerade = Powerade.init(target, elements, options);

test('executes Powerade.init succesfully', () => {
  expect(powerade.constructor.name).toBe('Powerade');
});

test('creates visualization structure', () => {
  const visualization = target.querySelector('.visualization');
  const dropzones = visualization.querySelectorAll('[data-drop-target]');
  expect(dropzones.length).toBe(25);
  const axes = visualization.querySelectorAll('[class*="header-"]');
  expect(axes.length).toBe(3);
  const legend = visualization.querySelectorAll('[class*="legend-"]');
  expect(legend.length).toBe(1);
});

test('load elements into visualization', () => {
  const visualization = target.querySelector('.visualization');
  const draggables = visualization.querySelectorAll('[draggable="true"]');
  expect(draggables.length).toBe(24);
});
