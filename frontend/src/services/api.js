const apiRoot = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api/v2' : 'https://swarfarm.com/api/v2';

async function get(path) {
  const response = await fetch(`${apiRoot}/${path}`, {
    credentials: 'same-origin',
  });
  return await response.json();
}

async function post(path, data = {}) {
  const response = await fetch(`${apiRoot}/${path}`, {
    method: 'POST',
    cedentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export default {
  get,
  post,
};
