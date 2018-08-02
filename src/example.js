let target = document.querySelector('#powerade');
let elements = [
  {
    label: 'element out',
    values: {'x-dimension': '', 'y-dimension': '', 'z-dimension': ''}
  },
  {
    label: 'element 0',
    values: {'x-dimension': 0, 'y-dimension': 0, 'z-dimension': 0}
  },
  {
    label: 'element 1',
    values: {'x-dimension': 1, 'y-dimension': 1, 'z-dimension': 1}
  },
  {
    label: 'element 2',
    values: {'x-dimension': 2, 'y-dimension': 2, 'z-dimension': 2}
  },
  {
    label: 'element 3',
    values: {'x-dimension': 3, 'y-dimension': 3, 'z-dimension': 3}
  },
  {
    label: 'element 4',
    values: {'x-dimension': 4, 'y-dimension': 4, 'z-dimension': 4}
  },
  {
    label: 'element 5',
    values: {'x-dimension': 5, 'y-dimension': 5, 'z-dimension': 5}
  }
];
let options = {};
let powerade = Powerade.init(target, elements, options);
