export const leaderSkillArea = {
  General: 1,
  Dungeon: 2,
  Element: 3,
  Arena: 4,
  Guild: 5,
};

export const leaderSkillImageUrl = skill => {
  let suffix;

  switch (skill.area) {
    case leaderSkillArea.element:
      suffix = `_${skill.element}`;
      break;
    case leaderSkillArea.general:
      suffix = "";
      break;
    default:
      suffix = `_${skill.area}`;
  }
  const attribute = skill.attribute.replace(" ", "_");

  return `/static/herders/images/skills/leader/leader_skill_${attribute}${suffix}.png`;
};

export const leaderSkillDescription = skill => {
  let condition;

  switch (skill.area) {
    case leaderSkillArea.Dungeon:
      condition = "in the Dungeons ";
      break;
    case leaderSkillArea.Arena:
      condition = "in the Arena ";
      break;
    case leaderSkillArea.Guild:
      condition = "in Guild Content ";
      break;
    case leaderSkillArea.Element:
      condition = `with ${skill.element} attribute `;
      break;
    default:
      condition = "";
  }

  return `Increase the ${skill.attribute} of ally monsters ${condition}by ${skill.amount}%`;
};
