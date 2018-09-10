/* globals Powerade */
const target = document.querySelector('#powerade-got');
import { elements, options }  from '../data/got.js';
Powerade.init(target, elements, options);

const usersTarget = document.querySelector('#powerade-radomuser');
const users = require('../data/users.json').results.map(user => {
  return {
    label: user.name.first,
    values: {
      'x-dimension': user.name.first.length % 6,
      'y-dimension': user.name.last.length % 6,
      'z-dimension': user.email.length % 6
    },
    avatar: user.picture.large
  };
});
const userOptions = {
  display: {
    label: true,
    avatar: true
  }
};
Powerade.init(usersTarget, users, userOptions);
