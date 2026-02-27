let accessToken = null;
const url = "http://localhost:3000"
const root = document.documentElement
const accent = root.style.getPropertyValue("--accent")

async function logout(){
  // futuramente haverá deletar cookies
  await fetch(`${url}/tokens/delete`, {
    credentials: "include",
    method: "POST",
  })

  window.location.href = 'index.html'
}

function createPopup(message, color){
  const existePopup = document.querySelector("custom-popup")
  if(existePopup) existePopup.remove()

  const popup = document.createElement("custom-popup")
  popup.setAttribute("message", message)
  popup.setAttribute("color", color)

  document.body.appendChild(popup)
}

function popupStatusCode(statusCode, message) {
  switch (statusCode) {
    case 401: createPopup(message || "Usuário não está autenticado"); break;
    case 403: createPopup(message || "Usuário não autorizado para ver o conteúdo"); break;
    case 404: createPopup(message || "Usuário não encontrado"); break;
    case 500: createPopup(message || "O servidor encontrou um problema na qual não soube lidar, tente novamente"); break;
  
    default:
      break;
  }
}

