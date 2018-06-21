const Powerade = require('../src/index');
let target = document.createElement('div');

test('executes Powerade.init', () => {
  let powerade = Powerade.init(target, [], { border: [ 'left' ], display: { label: false } });
  expect(powerade.constructor.name)
    .toBe('Powerade');
});
