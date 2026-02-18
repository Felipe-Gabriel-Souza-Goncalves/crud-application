const tableFuncionario = document.getElementById("tabela-funcionarios")
const opcoesTabela = document.getElementById("opcoesTabela")
const spanIndex = document.getElementsByClassName("idFuncionario")
const checkboxFuncionarios = document.getElementsByClassName("checkFuncionario")

const nomesInput = document.getElementsByClassName("inputFuncionario")
const selectInput = document.getElementsByClassName("cargosFuncionario")

async function atualizarUsuarios(){
  if(!confirm("Deseja atualizar as inforamções desses usuários?")){
    return
  }

  try {
    let changesToDo = []
    let rowIndex = []
    Array.from(checkboxFuncionarios)
         .map((checkbox, i) =>{
            console.log(checkbox)
            if(checkbox.checked) {
              rowIndex.push({index: i, value: checkbox.value})
            }
          })

    rowIndex.forEach(obj =>{
      const update = {
        id: parseInt(obj.value),
        name: nomesInput[obj.index].value,
        role: selectInput[obj.index].value
      }

      changesToDo.push(update)
    })

    tableFuncionario.innerHTML = "Carregando..."

    const res = await fetch(`${url}/users/atualizar`, {
      method: "POST",
      headers: {
        "Content-type" : "application/json",
      },
      credentials: "include",
      body: JSON.stringify({changes: changesToDo})
    })

    if(!res.ok){
      throw new Error(res.status);
      
    }

    pegarTodosFuncionarios()

  } catch(error){
    console.log(error)
  }
}

async function deletarUsuarios(){
  if(!confirm("Deseja deletar esses usuários?")){
    return
  }
  
  try {
    const allIds = Array.from(checkboxFuncionarios)
                        .filter(checkbox => checkbox.checked)
                        .map(checkbox => parseInt(checkbox.value))
  
    tableFuncionario.innerHTML = "Carregando..."
    
    const res = await fetch(`${url}/users/deletar`, {
      method: "POST",
      headers: {
        "Content-type" : "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ids: allIds})
    })

    if(res.status !== 204){
      throw new Error(res.status);
    }

    pegarTodosFuncionarios()

  } catch (error) {
    console.log(error)
  }
}

let deletarLiberado = false
function alternarSelecaoFuncionario(){
  deletarLiberado = !deletarLiberado
  deletarLiberado ? opcoesTabela.style.visibility = "unset" : 
                    opcoesTabela.style.visibility = "hidden"

  for(let i = 0; i < spanIndex.length; i++){
    deletarLiberado ? spanIndex[i].style.display = "none" :
                      spanIndex[i].style.display = "unset"

    if(deletarLiberado){
      checkboxFuncionarios[i].style.display = "unset"
    } else{
      checkboxFuncionarios[i].style.display = "none"
      checkboxFuncionarios[i].checked = false
    }
  }
}

function selecionarLinha(index){
  if(!deletarLiberado) alternarSelecaoFuncionario()
  
  const checkbox = document.querySelectorAll(".checkFuncionario")[index]
  checkbox.checked = !checkbox.checked;

  quantidadeLinhasSelecionadas()
}

function quantidadeLinhasSelecionadas(){
  const checkbox = document.querySelectorAll(".checkFuncionario")

  let checkboxAtivos = 0
  checkbox.forEach(el => {
    if(el.checked) checkboxAtivos++
  })
  
  if(checkboxAtivos <= 0) alternarSelecaoFuncionario()
}

async function pegarTodosFuncionarios() {
  mostrarCarregando()

  try {
    const usuarios = await buscarUsuarios()

    if (!usuarios || usuarios.length === 0) {
      return mostrarMensagem("Não há funcionários no banco")
    }

    renderizarTabela(usuarios.slice(0, 50))

  } catch (erro) {
    mostrarMensagem("Erro ao carregar informações")
    console.error(erro)
  }
}

/* =========================
   FUNÇÕES AUXILIARES
========================= */

function mostrarCarregando() {
  tableFuncionario.textContent = "Carregando..."
}

function mostrarMensagem(msg) {
  tableFuncionario.textContent = msg
}

async function buscarUsuarios() {
  const res = await fetch(`${url}/users`, {
    credentials: "include"
  })
  return await res.json()
}

function atribuirTexto(valor, valorPadrao, elemento, atributo = "innerText") {
  if (!valor) {
    elemento[atributo] = valorPadrao
    elemento.style.color = "red"
  } else {
    elemento[atributo] = valor
  }
}

function formatarData(datetime) {
  if (!datetime || datetime.length !== 19) return ""

  const [ano, mes, dia] = datetime.slice(0, 10).split("-")
  return `${dia}/${mes}/${ano}${datetime.slice(10, 16)} GMT-3`
}

function criarCelula(classe = "colunaFuncionario") {
  const td = document.createElement("td")
  td.classList.add(classe)
  return td
}

function criarLinhaUsuario(user, index) {
  const tr = document.createElement("tr")
  tr.onclick = (e) => {
    const target = e.target

    // Se for checkbox, nunca ativa
    if (target.type === "checkbox") return

    // Se for input (que não é checkbox)
    if (target.nodeName === "INPUT" ||
        target.nodeName === "SELECT"
    ) {
      if (deletarLiberado === false) {
        selecionarLinha(index)
      }
      return
    }

    // Qualquer outro clique dentro da <tr>
    selecionarLinha(index)
  }


  tr.appendChild(criarColunaIndice(user, index))
  tr.appendChild(criarColunaInput(user.name, "???"))
  tr.appendChild(criarColunaTexto(user.email, "???"))
  tr.appendChild(criarColunaSelect(user.role))
  tr.appendChild(criarColunaTexto(formatarData(user.created_at), "--/--/-- --:--"))

  return tr
}

function criarColunaIndice(user, index) {
  const td = criarCelula()

  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.classList.add("checkFuncionario")
  checkbox.value = user.id
  checkbox.setAttribute("onclick", "quantidadeLinhasSelecionadas()")

  const span = document.createElement("span")
  span.classList.add("idFuncionario")
  span.innerText = String(index + 1).padStart(4, "0")

  td.appendChild(checkbox)
  td.appendChild(span)

  return td
}

function criarColunaInput(valor, padrao) {
  const td = criarCelula()
  const input = document.createElement("input")
  input.classList.add("inputFuncionario")
  atribuirTexto(valor, padrao, input, "value")
  td.appendChild(input)
  return td
}

function criarColunaTexto(valor, padrao) {
  const td = criarCelula()
  atribuirTexto(valor, padrao, td)
  return td
}

function criarColunaSelect(valor){
  const td = criarCelula()
  const opcoes = ['Visitante', 'Funcionário', 'Administrador']
  const select = document.createElement("select")
  select.classList.add("cargosFuncionario")
  opcoes.forEach((opt, i) =>{
    const optionElement = document.createElement("option")
    optionElement.value = opt
    optionElement.textContent = opt

    select.appendChild(optionElement)
  })
  select.value = valor || "Visitante"
  td.appendChild(select)
  return td
}

function renderizarTabela(usuarios) {
  const fragmento = document.createDocumentFragment()

  usuarios.forEach((user, index) => {
    fragmento.appendChild(criarLinhaUsuario(user, index))
  })

  tableFuncionario.textContent = ""
  tableFuncionario.appendChild(fragmento)
}


pegarTodosFuncionarios()