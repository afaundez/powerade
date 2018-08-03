let target = document.querySelector('#powerade');
const outsideElements = [
  {
    label: 'element out',
    values: {'x-dimension': '', 'y-dimension': '', 'z-dimension': ''}
  }
];
const insideElements = [...Array(6).keys()].map( position => {
  return {
    label: `element ${position}`,
    values: {
      'x-dimension': position,
      'y-dimension': position,
      'z-dimension': position
    }
  };
});
const elements = [...outsideElements, ...insideElements];
let options = {};
let powerade = Powerade.init(target, elements, options);
