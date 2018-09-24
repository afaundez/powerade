/* globals expect */
const Powerade = require('../src/main');
const target = document.createElement('div');
import { elements, options }  from './fixtures/data/got.js';
const powerade = Powerade.init(target, elements, options);

test('executes Powerade.init succesfully', () => {
  expect(powerade.constructor.name).toBe('Powerade');
});

test('creates layout structure', () => {
  const layout = target.querySelector('.layout');
  const dropzones = layout.querySelectorAll('.dropzone');
  expect(dropzones.length).toBe(25);
  const axes = layout.querySelectorAll('[class*="header-"]');
  expect(axes.length).toBe(3);
  const legend = layout.querySelectorAll('[class*="legend-"]');
  expect(legend.length).toBe(1);
});

test('load elements into layout', () => {
  const layout = target.querySelector('.layout');
  const draggables = layout.querySelectorAll('.draggable');
  expect(draggables.length).toBe(24);
});
