import api from "@/services/api";

export async function fetchMonsterInstance(owner, id) {
  const response = await api.get(`/profiles/${owner}/monsters/${id}/`);
  return response.data;
}

export async function fetchMonsterInstances(owner, params = {}) {
  const response = await api.get(`/profiles/${owner}/monsters/`, { params });
  return response.data;
}
