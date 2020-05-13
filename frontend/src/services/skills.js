export const leaderSkillImageUrl = (skill) => {
  let suffix;

  switch (skill.area) {
    case 'Element':
      suffix = `_${skill.Element}`;
      break;
    case 'General':
      suffix = '';
      break;
    default:
      suffix = `_${skill.area}`;
  }
  const attribute = skill.attribute.replace(' ', '_');

  return `/static/herders/images/skills/leader/leader_skill_${attribute}${suffix}.png`;
};

export const leaderSkillDescription = (skill) => {
  let condition;

  switch (skill.area) {
    case 'Dungeon':
      condition = 'in the Dungeons ';
      break;
    case 'Arena':
      condition = 'in the Arena ';
      break;
    case 'Guild':
      condition = 'in Guild Content ';
      break;
    case 'Element':
      condition = `with ${skill.element} attribute `;
      break;
    default:
      condition = '';
  }

  return `Increase the ${skill.attribute} of ally monsters ${condition}by ${skill.amount}%`;
};
