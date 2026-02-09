
const barrier = document.getElementById("div-barrier")
const login = document.getElementById("form-login") 
const cadastro = document.getElementById("form-cadastro")  


const nameLogin = document.getElementById("name-login")
const passwordLogin = document.getElementById("password-login")

const nameCadastro = document.getElementById("name-cadastro")
const emailCadastro = document.getElementById("email-cadastro")
const passwordCadastro = document.getElementById("password-cadastro")

function logar(){
  if(!nameLogin.value.trim() || !passwordLogin.value.trim()){
    return
  }

  const bodyEnvio = {
    name: nameLogin.value,
    password: passwordLogin.value
  }

  try {
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({...bodyEnvio})
    })
    .then(response => {
      if(response.status == 200){
        window.location.href = 'home.html'
      } else{
        alert("ERRO NO LOGIN")
      }
    })
    
  } catch (error) {
    
  }
}

function cadastrar(){
  if(!nameCadastro.value.trim() ||
     !passwordCadastro.value.trim() || 
     !emailCadastro.value.trim()){
    return
  }
  
  const bodyEnvio = {
    name: nameCadastro.value,
    email: emailCadastro.value,
    password: passwordCadastro.value,
  }

  fetch("http://localhost:3000/users/", {
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
    barrier.style.left = "unset"
    barrier.style.right = "0"
    
    barrier.style.borderRadius = "0 0.75rem 0.75rem 0 "
    
  } else if(form === 'cadastro'){
    barrier.style.left = "0"
    barrier.style.right = "unset"

    barrier.style.borderRadius = "0.75rem 0 0 0.75rem"

  } 
}


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

login.addEventListener('submit', (e) => {e.preventDefault()})
cadastro.addEventListener('submit', (e) => {e.preventDefault()})