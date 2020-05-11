import api from "@/services/api";

export async function fetchMonster(id) {
  const response = await api.get(`/monsters/${id}/`);
  return response.data;
}

export async function fetchMonsters(params = {}) {
  const response = await api.get("/monsters/", { params });
  return response.data;
}

export async function fetchSkill(id) {
  const response = await api.get(`/skills/$${id}/`);
  return response.data;
}

export async function fetchSkills(params = {}) {
  const response = await api.get("/skills/", { params });
  return response.data;
}
