
const currentPage = 'index'

const barrier = document.getElementById("div-barrier")
const login = document.getElementById("form-login") 
const cadastro = document.getElementById("form-cadastro")  

const emailLogin = document.getElementById("email-login")
const passwordLogin = document.getElementById("password-login")

const nameCadastro = document.getElementById("name-cadastro")
const emailCadastro = document.getElementById("email-cadastro")
const passwordCadastro = document.getElementById("password-cadastro")

const visibilidadeCadastro = document.getElementById("visibilidade-cadastro")
const visibilidadeLogin = document.getElementById("visibilidade-login")

function filtrarInputVazio(htmlElement){
  let valido = true;

  if(htmlElement.id === "password-cadastrar" && 
     htmlElement.value.trim().length < 6)
  {
    valido = false
  }

  if(typeof(htmlElement.value) != "string") valido = false
  if(!htmlElement.value.trim()) valido = false

  // decoracaoInput(htmlElement)
  if(valido === false){
    return false
  }

  return true
}

// function decoracaoInput(htmlInput){

// }

function logar(){
  if(!emailLogin.value.trim() || !passwordLogin.value.trim()){
    return
  }

  const bodyEnvio = {
    email: emailLogin.value,
    password: passwordLogin.value
  }

  try {
    fetch(`${url}/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...bodyEnvio })
    })
    .then(async response => {
      const data = await response.json();

      if (!response.ok) {
        popupStatusCode(response.status, data.message);
        return;
      }

      if (data.redirectTo) {
        window.location.href = data.redirectTo;
      }
    });
    
  } catch (error) {
    console.error(error)
    popupStatusCode('Erro ao fazer login');
  }
}

function cadastrar(){

  if(!filtrarInputVazio(nameCadastro)) return
  if(!filtrarInputVazio(emailCadastro)) return
  if(!filtrarInputVazio(passwordCadastro)) return

  
  const bodyEnvio = {
    name: nameCadastro.value.trim(),
    email: emailCadastro.value.trim(),
    password: passwordCadastro.value.trim(),
  }

  fetch(`${url}/users/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({...bodyEnvio})
  })
  .then(response => {
    if(response.status == 201){
      alert("Usuário cadastrado")
      window.location.href = 'home.html'
    } else{
      alert("ERRO NO LOGIN")
    }
  })

}

function trocarForm(form){
  if(form === 'login'){
    barrier.style.transform = "translateX(0%)"
    barrier.style.borderRadius = "0 0.75rem 0.75rem 0 "
    
  } else if(form === 'cadastro'){
    barrier.style.transform = "translateX(-100%)"
    barrier.style.borderRadius = "0.75rem 0 0 0.75rem"

  } 
}

// Aparecer popup dos ícones ilustrativos
const popup = document.getElementById("popupIlustrativo")
document.querySelectorAll(".icon").forEach(el =>{
  el.addEventListener('mouseenter', (event) => {
    const x = event.clientX
    const y = event.clientY

    popup.style.top = (y - 60) + "px"
    popup.style.left = (x - 88) + "px"

    popup.style.opacity = "1"
  })

  el.addEventListener('mouseleave', () =>{
    popup.style.opacity = "0"
  })
})


// const inputs = document.querySelectorAll(".input-group input")
// inputs.forEach(input =>{
//   input.addEventListener("focusout", decoracaoInput(input))
// })

// Não reiniciar a página ao enviar 
login.addEventListener('submit', (e) => {e.preventDefault()})
cadastro.addEventListener('submit', (e) => {e.preventDefault()})

function atualizarCorGrafico(){
  return
}

function visibilidadeSenha(input, img){
  if(input.type == 'password'){
    input.type = 'text'
    img.src = 'img/visibilidade on.svg'
  } else{
    input.type = 'password'
    img.src = 'img/visibilidade off.svg'
  }
}