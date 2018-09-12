const imagesURL = 'https://awoiaf.westeros.org/images';
export const elements = [
  {
    label: 'Cersei Lannister',
    values: { Power: 4, Influence: 3, Leadership: 3 },
    avatar: `${imagesURL}/4/4f/MagaliVilleneuve_CLface.jpg`
  },
  {
    label: 'Daenerys Targaryen',
    values: { Power: 4, Influence: 4, Leadership: 3 },
    avatar: `${imagesURL}/1/13/Daenerys_targaryen_by_regochan-d7hfi57.png`
  },
  {
    label: 'Jon Snow',
    values: { Power: 2, Influence: 2, Leadership: 4 },
    avatar: `${imagesURL}/d/d2/Jon_snow_by_teiiku.jpg`
  },
  {
    label: 'Sansa Stark',
    values: { Power: 3, Influence: 3, Leadership: 2 },
    avatar: `${imagesURL}/0/05/The_North_Remembers_by_Isabel_Westling.jpg`
  },
  {
    label: 'Arya Stark',
    values: { Power: 2, Influence: 1, Leadership: 1 },
    avatar: `${imagesURL}/3/36/John_Picacio_Arya.jpg`
  },
  {
    label: 'Jaime Lannister',
    values: { Power: 2, Influence: 2, Leadership: 3 },
    avatar: `${imagesURL}/f/f8/MagaliVilleneuve_JaimeLannister.jpg`
  },
  {
    label: 'Tyrion Lannister',
    values: { Power: 2, Influence: 4, Leadership: 3 },
    avatar: `${imagesURL}/7/78/Tyrion_as_Hand.jpg`
  },
  {
    label: 'Missandei',
    values: { Power: 1, Influence: 3, Leadership: 2 },
    avatar: `${imagesURL}/a/a4/Drazenka_Kimpel_Missandei.jpg`
  },
  {
    label: 'Brienne of Tarth',
    values: { Power: 1, Influence: 3, Leadership: 2 },
    avatar: `${imagesURL}/0/07/Brienne_by_quickreaver.jpg`
  },
  {
    label: 'Samwell Tarly',
    values: { Power: 1, Influence: 4, Leadership: 1 },
    avatar: `${imagesURL}/c/ca/Samwell_Tarly.jpg`
  },
  {
    label: 'Bran Stark',
    values: { Power: 3, Influence: 1, Leadership: 1 },
    avatar: `${imagesURL}/4/43/Mark_Evans_Bran_Stark.png`
  },
  {
    label: 'Gilly',
    values: { Power: 1, Influence: 1, Leadership: 1 },
    avatar: `${imagesURL}/2/22/Gilly_by_pojypojy.jpg`
  },
  {
    label: 'Sandor Clegane',
    values: { Power: 2, Influence: 2, Leadership: 1 },
    avatar: `${imagesURL}/7/7b/MiguelRegodónHarkness_theHound.jpg`
  },
  {
    label: 'Jorah Mormont',
    values: { Power: 2, Influence: 3, Leadership: 3 },
    avatar: `${imagesURL}/a/af/Jorah_Mormont.jpg`
  },
  {
    label: 'Varys',
    values: { Power: 1, Influence: 4, Leadership: 3 },
    avatar: `${imagesURL}/1/14/Varys_by_Amoka.jpg`
  },
  {
    label: 'Melisandre',
    values: { Power: 3, Influence: 2, Leadership: 2 },
    avatar: `${imagesURL}/f/f0/Melisandre_Fantasy_Flight_Games.jpg`
  },
  {
    label: 'Bronn',
    values: { Power: 2, Influence: 3, Leadership: 2 },
    avatar: `${imagesURL}/5/51/Bronn.jpg`
  },
  {
    label: 'Gendry',
    values: { Power: 1, Influence: 1, Leadership: 1 },
    avatar: `${imagesURL}/8/81/Gendry_Amoka.png`
  },
  {
    label: 'Eddard Stark',
    values: { 'Power': 0, 'Influence': 3, 'Leadership': 0 },
    avatar: `${imagesURL}/0/0a/Eddard_Amoka.jpg`
  },
  {
    label: 'Robb Stark',
    values: { 'Power': 0, 'Influence': 0, 'Leadership': 0 },
    avatar: `${imagesURL}/1/18/Magali_Villenueve_Robb_StarkII.jpg`
  },
  {
    label: 'Catelyn Stark',
    values: { 'Power': 0, 'Influence': 1, 'Leadership': 0 },
    avatar: `${imagesURL}/4/4a/NRCatStark11.jpg`
  },
  {
    label: 'Robert Baratheon',
    values: { 'Power': 0, 'Influence': 0, 'Leadership': 0 },
    avatar: `${imagesURL}/b/bd/RobertBKingMagali_Villeneuve.jpg`
  },
  {
    label: 'Stannis Baratheon',
    values: { 'Power': 0, 'Influence': 0, 'Leadership': 0 },
    avatar: `${imagesURL}/7/71/Joshua_Cairosstannisbaratheon.jpg`
  },
  {
    label: 'Joffrey Baratheon',
    values: { 'Power': 0, 'Influence': 0, 'Leadership': 0 },
    avatar: `${imagesURL}/9/93/Joffrey_Baratheon.jpg`
  },
];

export const options = {
  border: ['left', 'bottom'],
  dimensions: {
    x: { label: 'Power' },
    y: { label: 'Influence' },
    z: { label: 'Leadership', cardinality: 2}
  },
  display: {
    label: true
  }
};
