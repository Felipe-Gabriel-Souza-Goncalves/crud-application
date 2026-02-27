const currentPage = 'home'

async function refresh() {
  const response = await fetch(`${url}/tokens/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    console.log("Não autenticado");
    return;
  }

  const data = await response.json();
  accessToken = data.accessToken;

  console.log(accessToken)
}

refresh()