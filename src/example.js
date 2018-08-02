let target = document.querySelector('#powerade');
let elements = [
  {
    label: 'element 01',
    values: {'x-dimension': 4, 'y-dimension': 3, 'z-dimension': 2}
  }
];
let options = {};
let powerade = Powerade.init(target, elements, options);
