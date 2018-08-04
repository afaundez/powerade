const users = require('./users.json').results;
const target = document.querySelector('#powerade');
const elements = users.map(user => {
  return {
    label: user.name.first,
    values: {
      'x-dimension': user.name.first.length % 6,
      'y-dimension': user.name.last.length % 6,
      'z-dimension': user.email.length % 6
    },
    avatar: user.picture.thumbnail
  };
});
elements[0].values = {'x-dimension': '', 'y-dimension': '', 'z-dimension': ''};
elements[1].values['x-dimension'] = '';
elements[2].values['y-dimension'] = '';
elements[3].values['z-dimension'] = '';
const options = {
  display: {
    label: true
  }
};
const powerade = Powerade.init(target, elements, options);
