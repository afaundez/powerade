/* globals expect */
const Powerade = require('../src/main');
const target = document.createElement('div');
const powerade = Powerade.init(target, [], {});

test('executes Powerade.init succesfully', () => {
  expect(powerade.constructor.name).toBe('Powerade');
});

test('creates visualization structure', () => {
  const dropzones = target.querySelectorAll('[data-drop-target]');
  expect(dropzones.length).toBe(36);
  const axes = target.querySelectorAll('[class*="header-"]');
  expect(axes.length).toBe(3);
  const legend = target.querySelectorAll('[class*="legend-"]');
  expect(legend.length).toBe(1);
});
