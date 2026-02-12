const tableFuncionario = document.getElementById("tabela-funcionarios")

function atualizarUsuario(){

}

function deletarUsuario(){

}


async function pegarTodosFuncionarios(){
  tableFuncionario.textContent = "Carregando..."

  let data;
  try {
    const res = await fetch('http://localhost:3000/users')
    data = await res.json()

  } catch (error) {
    tableFuncionario.textContent = "Erro ao carregar informações"
  }

  if(!data){
    tableFuncionario.textContent = "Não há funcionários no banco"
  }


  const fragmento = document.createDocumentFragment()

  data.forEach((user, index) =>{
    if(index >= 50) return

    const tr = document.createElement("tr")

    const tdIndex = document.createElement("td")
    tdIndex.classList.add("colunaFuncionario")
    tdIndex.classList.add("idFuncionario")
    tdIndex.innerText = (index+1).toString().padStart(4, 0)

    const tdNome = document.createElement("td")
    tdNome.classList.add("colunaFuncionario")
    tdNome.innerText = user.name || ""

    const tdEmail = document.createElement("td")
    tdEmail.classList.add("colunaFuncionario")
    tdEmail.innerText = user.email || ""

    const tdCargo = document.createElement("td")
    tdCargo.classList.add("colunaFuncionario")
    tdCargo.innerText = user.cargo || "Visitante"

    const tdCriadoEm = document.createElement("td")
    tdCriadoEm.classList.add("colunaFuncionario")
    tdCriadoEm.innerText = user.criadoEm || "Não especificado"

    tr.appendChild(tdIndex)
    tr.appendChild(tdNome)
    tr.appendChild(tdEmail)
    tr.appendChild(tdCargo)
    tr.appendChild(tdCriadoEm)

    fragmento.appendChild(tr)
  })

  tableFuncionario.textContent = ""
  tableFuncionario.appendChild(fragmento)

}

setTimeout(pegarTodosFuncionarios, 2000)