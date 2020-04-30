const apiRoot =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000/api/v2"
    : "https://swarfarm.com/api/v2";

async function get(path, query_params = {}) {
  const url = new URL(`${apiRoot}/${path}`);
  Object.keys(query_params).forEach(key =>
    url.searchParams.append(key, query_params[key])
  );
  console.debug(`Sending request to ${url}`);
  const response = await fetch(url, {
    credentials: "same-origin",
  });
  return await response.json();
}

async function post(path, data = {}) {
  const response = await fetch(`${apiRoot}/${path}`, {
    method: "POST",
    cedentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export default {
  get,
  post,
};
