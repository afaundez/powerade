const gotAPI = 'https://api.got.show/misc/images/characters';
export const elements = [
  {
    label: 'Cersei Lannister',
    values: { Power: 4, Influence: 3, Leadership: 3 },
    avatar: `${gotAPI}/Cersei_Lannister.jpeg`
  },
  {
    label: 'Daenerys Targaryen',
    values: { Power: 4, Influence: 4, Leadership: 3 },
    avatar: `${gotAPI}/Daenerys_Targaryen.jpeg`
  },
  {
    label: 'Jon Snow',
    values: { Power: 2, Influence: 2, Leadership: 4 },
    avatar: `${gotAPI}/Jon_Snow.jpeg`
  },
  {
    label: 'Sansa Stark',
    values: { Power: 3, Influence: 3, Leadership: 2 },
    avatar: `${gotAPI}/Sansa_Stark.jpeg`
  },
  {
    label: 'Arya Stark',
    values: { Power: 2, Influence: 1, Leadership: 1 },
    avatar: `${gotAPI}/Arya_Stark.jpeg`
  },
  {
    label: 'Jaime Lannister',
    values: { Power: 2, Influence: 2, Leadership: 3 },
    avatar: `${gotAPI}/Jaime_Lannister.jpeg`
  },
  {
    label: 'Tyrion Lannister',
    values: { Power: 2, Influence: 4, Leadership: 3 },
    avatar: `${gotAPI}/Tyrion_Lannister.jpeg`
  },
  {
    label: 'Missandei',
    values: { Power: 1, Influence: 3, Leadership: 2 },
    avatar: `${gotAPI}/Missandei.jpeg`
  },
  {
    label: 'Brienne of Tarth',
    values: { Power: 1, Influence: 3, Leadership: 2 },
    avatar: `${gotAPI}/Brienne_of_Tarth.jpeg`
  },
  {
    label: 'Samwell Tarly',
    values: { Power: 1, Influence: 4, Leadership: 1 },
    avatar: `${gotAPI}/Samwell_Tarly.jpeg`
  },
  {
    label: 'Bran Stark',
    values: { Power: 3, Influence: 1, Leadership: 1 },
    avatar: `${gotAPI}/Bran_Stark.jpeg`
  },
  {
    label: 'Gilly',
    values: { Power: 1, Influence: 1, Leadership: 1 },
    avatar: `${gotAPI}/Gilly.jpeg`
  },
  {
    label: 'Sandor Clegane',
    values: { Power: 2, Influence: 2, Leadership: 1 },
    avatar: `${gotAPI}/Sandor_Clegane.jpeg`
  },
  {
    label: 'Jorah Mormont',
    values: { Power: 2, Influence: 3, Leadership: 3 },
    avatar: `${gotAPI}/Jorah_Mormont.jpeg`
  },
  {
    label: 'Varys',
    values: { Power: 1, Influence: 4, Leadership: 3 },
    avatar: `${gotAPI}/Varys.jpeg`
  },
  {
    label: 'Melisandre',
    values: { Power: 3, Influence: 2, Leadership: 2 },
    avatar: `${gotAPI}/Melisandre.jpeg`
  },
  {
    label: 'Bronn',
    values: { Power: 2, Influence: 3, Leadership: 2 },
    avatar: `${gotAPI}/Bronn.jpeg`
  },
  {
    label: 'Gendry',
    values: { Power: 1, Influence: 1, Leadership: 1 },
    avatar: `${gotAPI}/Gendry.png`
  },
  {
    label: 'Eddard Stark',
    values: { 'Power': 0, 'Influence': 3, 'Leadership': 0 },
    avatar: `${gotAPI}/Eddard_Stark.jpeg`
  },
  {
    label: 'Robb Stark',
    values: { 'Power': 0, 'Influence': 0, 'Leadership': 0 },
    avatar: `${gotAPI}/Robb_Stark.jpeg`
  },
  {
    label: 'Catelyn Stark',
    values: { 'Power': 0, 'Influence': 1, 'Leadership': 0 },
    avatar: `${gotAPI}/Catelyn_Stark.jpeg`
  },
  {
    label: 'Robert Baratheon',
    values: { 'Power': 0, 'Influence': 0, 'Leadership': 0 },
    avatar: `${gotAPI}/Robert_Baratheon.jpeg`
  },
  {
    label: 'Stannis Baratheon',
    values: { 'Power': 0, 'Influence': 0, 'Leadership': 0 },
    avatar: `${gotAPI}/Stannis_Baratheon.jpeg`
  },
  {
    label: 'Joffrey Baratheon',
    values: { 'Power': 0, 'Influence': 0, 'Leadership': 0 },
    avatar: `${gotAPI}/Joffrey_Baratheon.jpeg`
  },
];

export const options = {
  border: ['left', 'bottom', 'top', 'right'],
  dimensions: {
    x: { label: 'Power' },
    y: { label: 'Influence' },
    z: { label: 'Leadership' }
  },
  display: {
    label: true
  }
};
