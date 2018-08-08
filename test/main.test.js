/* globals expect */
const Powerade = require('../src/main');
const target = document.createElement('div');

test('executes Powerade.init', () => {
  const powerade = Powerade.init(target, [], {
    border: [ 'left' ],
    display: { label: false }
  });
  expect(powerade.constructor.name)
    .toBe('Powerade');
});
