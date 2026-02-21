

class ToggleMode extends HTMLElement{
  constructor() {
    super();
    this._isOn = false;
  }

  // Define a getter and setter for the property
  get isOn() {
    return this._isOn;
  }

  set isOn(bool) {
    this._isOn = bool;

    salvarTema(bool)
    mudarRootCSS(bool)
    this.loadElement();
  }
  
  connectedCallback(){
    this.loadElement();
  }

  loadElement(){
    if(this.isOn){
      this.innerHTML = `
        <img src='img/tema escuro.svg'
             alt='Tema escuro'
             width='40'>
      `
    } else {
      this.innerHTML = `
        <img src='img/tema claro.svg' 
             alt='Tema claro' 
             width='40'>
      `
    }

    this.querySelector("img").addEventListener("click", () => {
      this.isOn = !this.isOn;
    });
  }
}

customElements.define('toggle-darkmode', ToggleMode)

const toggleDarkmode = document.querySelector('toggle-darkmode')

function salvarTema(bool){
  if(bool){ // Se o dispositivo estiver com modo escuro padrão
    sessionStorage.setItem("modoEscuro", 'true')
  } else{  // Se o dispositivo estiver com modo claro padrão
    sessionStorage.setItem("modoEscuro", 'false')
  }
}

function mudarRootCSS(bool){
  
  if(bool){
    root.classList.add("dark")
  } else{
    if(root.classList.contains("dark")){
      root.classList.remove("dark")
    }
  }
}

(() =>{
  let preferDark = false;
  if(sessionStorage.getItem("modoEscuro")){
    preferDark = JSON.parse(sessionStorage.getItem("modoEscuro"))
  } else {
    preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  if(preferDark){
    toggleDarkmode.querySelector("img").click()
  }
})();