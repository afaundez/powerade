/* globals Powerade */
const target = document.querySelector('#powerade');
const elements = require('./data/users.json').results.map(user => {
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
const options = {
  style: ['powerade'],
  display: {
    label: true,
    avatar: true
  }
};
Powerade.init(target, elements, options);
