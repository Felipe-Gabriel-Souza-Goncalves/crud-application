
const cores = {
  vermelho:{
    padrao: "#ef4444",
    gradientDark: "#b91c1c",
    gradientLight: "#ff6b6b"
  }, 
  verde: {
    padrao: "#22c55e", 
    gradientDark: "#139a5b",
    gradientLight: "#32fd7d"
  },
  azul: { // Padrão
    padrao: "#3b82f6",
    gradientDark: "#1e37c1",
    gradientLight: "#51dfff"
  },
  roxo: {
    padrao: "#8b5cf6",  
    gradientDark: "#6d28d9",
    gradientLight: "#a78bfa"
  }


  // amarelo: "#eab308",   // amarelo mais sóbrio (evita neon)
  // rosa: "#ec4899",      // rosa moderno (não infantil)
}


class PickColor extends HTMLElement{
  constructor() {
    super();
  }

  connectedCallback(){
    this.innerHTML = `
      <div class='container-opcoes-cores'>      
        <button
                class='opcao-cor'
                style='background-color: ${cores['azul'].padrao}'
                onclick='mudarCor("azul")'></button>
        <button
                class='opcao-cor'
                style='background-color: ${cores['vermelho'].padrao}'
                onclick='mudarCor("vermelho")'></button>
        <button
                class='opcao-cor'
                style='background-color: ${cores['verde'].padrao}'
                onclick='mudarCor("verde")'></button>
        <button
                class='opcao-cor'
                style='background-color: ${cores['roxo'].padrao}'
                onclick='mudarCor("roxo")'></button>
      </div>
    `
  }
}

customElements.define('color-picker', PickColor)


function mudarCor(cor){
  if(!cores[cor]) {
    console.log("Cor inexistente", cor)
    return
  }

  root.style.setProperty("--accent", cores[cor].padrao)
  root.style.setProperty("--accentGradientDarker", cores[cor].gradientDark)
  root.style.setProperty("--accentGradientLighter", cores[cor].gradientLight)

  if(!window.location.pathname.includes("index.html")){
    atualizarCorGrafico(graficoBarras)
    atualizarCorGrafico(graficoLinha)
    atualizarCorGrafico(graficoPizza)
  }
}

mudarCor('vermelho')

// console.log(root.style.getPropertyValue('--accent'))
