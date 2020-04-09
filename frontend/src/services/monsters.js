export const awakenLevel = {
  incomplete: -1,
  unawakened: 0,
  awakened: 1,
  second: 2,
};

export const archetype = {
  attack: 'Attack',
  hp: 'HP',
  support: 'Support',
  defense: 'Defense',
  material: 'Material',
  none: 'None',
};

export const maxLevelFromStars = (stars) => 10 + stars * 5;
export const isMaxLevel = (stars, level) => level === maxLevelFromStars(stars);

export default {
  awakenLevel,
  archetype,
  maxLevelFromStars,
  isMaxLevel,
};
