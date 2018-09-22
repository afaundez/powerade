const target = document.querySelector('div#powerade');

const elements = [
  { label: 'Cersei Lannister', values: { Power: 4, Influence: 3, Leadership: 3 }, avatar: 'https://api.got.show/misc/images/characters/Cersei_Lannister.jpeg' },
  { label: 'Daenerys Targaryen', values: { Power: 4, Influence: 4, Leadership: 3 }, avatar: 'https://api.got.show/misc/images/characters/Daenerys_Targaryen.jpeg' },
  { label: 'Jon Snow', values: { Power: 2, Influence: 2, Leadership: 4 }, avatar: 'https://api.got.show/misc/images/characters/Jon_Snow.jpeg' },
  { label: 'Sansa Stark', values: { Power: 3, Influence: 3, Leadership: 2 }, avatar: 'https://api.got.show/misc/images/characters/Sansa_Stark.jpeg' },
  { label: 'Arya Stark', values: { Power: 2, Influence: 1, Leadership: 1 }, avatar: 'https://api.got.show/misc/images/characters/Arya_Stark.jpeg' },
  { label: 'Jaime Lannister', values: { Power: 2, Influence: 2, Leadership: 3 }, avatar: 'https://api.got.show/misc/images/characters/Jaime_Lannister.jpeg' },
  { label: 'Tyrion Lannister', values: { Power: 2, Influence: 4, Leadership: 3 }, avatar: 'https://api.got.show/misc/images/characters/Tyrion_Lannister.jpeg' },
  { label: 'Missandei', values: { Power: 1, Influence: 3, Leadership: 2 }, avatar: 'https://api.got.show/misc/images/characters/Missandei.jpeg' },
  { label: 'Brienne of Tarth', values: { Power: 1, Influence: 3, Leadership: 2 }, avatar: 'https://api.got.show/misc/images/characters/Brienne_of_Tarth.jpeg' },
  { label: 'Samwell Tarly', values: { Power: 1, Influence: 4, Leadership: 1 }, avatar: 'https://api.got.show/misc/images/characters/Samwell_Tarly.jpeg' },
  { label: 'Bran Stark', values: { Power: 3, Influence: 1, Leadership: 1 }, avatar: 'https://api.got.show/misc/images/characters/Bran_Stark.jpeg' },
  { label: 'Gilly', values: { Power: 1, Influence: 1, Leadership: 1 }, avatar: 'https://api.got.show/misc/images/characters/Gilly.jpeg' },
  { label: 'Sandor Clegane', values: { Power: 2, Influence: 2, Leadership: 1 }, avatar: 'https://api.got.show/misc/images/characters/Sandor_Clegane.jpeg' },
  { label: 'Jorah Mormont', values: { Power: 2, Influence: 3, Leadership: 3 }, avatar: 'https://api.got.show/misc/images/characters/Jorah_Mormont.jpeg' },
  { label: 'Varys', values: { Power: 1, Influence: 4, Leadership: 3 }, avatar: 'https://api.got.show/misc/images/characters/Varys.jpeg' },
  { label: 'Melisandre', values: { Power: 3, Influence: 2, Leadership: 2 }, avatar: 'https://api.got.show/misc/images/characters/Melisandre.jpeg' },
  { label: 'Bronn', values: { Power: 2, Influence: 3, Leadership: 2 }, avatar: 'https://api.got.show/misc/images/characters/Bronn.jpeg' },
  { label: 'Gendry', values: { Power: 1, Influence: 1, Leadership: 1 }, avatar: 'https://api.got.show/misc/images/characters/Gendry.png' },
  { label: 'Eddard Stark', values: { 'Power': 0, 'Influence': 3, 'Leadership': 0 }, avatar: 'https://api.got.show/misc/images/characters/Eddard_Stark.jpeg' },
  { label: 'Robb Stark', values: { 'Power': 0, 'Influence': 0, 'Leadership': 0 }, avatar: 'https://api.got.show/misc/images/characters/Robb_Stark.jpeg' },
  { label: 'Catelyn Stark', values: { 'Power': 0, 'Influence': 1, 'Leadership': 0 }, avatar: 'https://api.got.show/misc/images/characters/Catelyn_Stark.jpeg' },
  { label: 'Robert Baratheon', values: { 'Power': 0, 'Influence': 0, 'Leadership': 0 }, avatar: 'https://api.got.show/misc/images/characters/Robert_Baratheon.jpeg' },
  { label: 'Stannis Baratheon', values: { 'Power': 0, 'Influence': 0, 'Leadership': 0 }, avatar: 'https://api.got.show/misc/images/characters/Stannis_Baratheon.jpeg' },
  { label: 'Joffrey Baratheon', values: { 'Power': 0, 'Influence': 0, 'Leadership': 0 }, avatar: 'https://api.got.show/misc/images/characters/Joffrey_Baratheon.jpeg' },
];

const options = {
  borders: ['left', 'bottom'],
  dimensions: {
    x: { label: 'Power' },
    y: { label: 'Influence' },
    z: { label: 'Leadership' }
  }
};

Powerade.init(target, elements, options);
