const url = "http://localhost:3000"
const root = document.documentElement
const accent = root.style.getPropertyValue("--accent")

function logout(){
  // futuramente haverá deletar cookies

  window.location.href = 'index.html'
}
