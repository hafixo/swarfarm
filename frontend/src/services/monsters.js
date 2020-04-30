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

export const getFamilyIds = (family_id) => {
  // Special case handling for certain monsters which can skill up from many monster families
  if (family_id == 23000) {
    switch (family_id) {
      // Vampire Lord
      case 23000:
        return [23000, 14700];

      // Fairy Queen
      case 19100:
        return [19100, 10100];

      // All other monsters
      default:
        return [family_id];
    }
  }
};
