const url = "http://localhost:3000"

const cores = {
  vermelho: "",
  verde: "",
  amarelo: "",
  azul: "",
  roxo: "", 
  rosa: "",
  branco: ""
}

const prefereModoEscuro = 
  (sessionStorage.getItem("modoEscuro") !== undefined) ?
  sessionStorage.getItem("modoEscuro") :
  window.matchMedia('(prefers-color-scheme: dark)').matches;

function mudarTema(bool){
  let modoEscuro = bool !== undefined ? bool : prefereModoEscuro  

  if(prefereModoEscuro){ // Se o dispositivo estiver com modo escuro padrão
    sessionStorage.setItem("modoEscuro", 'true')
  } else{  // Se o dispositivo estiver com modo claro padrão
    modoEscuro = false;
    sessionStorage.setItem("modoEscuro", 'false')
  }


}

function mudarCor(cor){

}

function salvarPrefencias(){

}

function logout(){
  
}
