class Sidebar extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
      <div class="sidebar">
        <ul>
          <li>
            <span class="icon"><img src="img/home.svg"></span>
            <span class="text">Home</span>
          </li>
          <li>
            <span class="icon"><img src="img/dashboard.svg"></span>
            <span class="text">Dashboard</span>
          </li>
          <li>
            <span class="icon"><img src="img/configuração.svg"></span>
            <span class="text">Configurações</span>
          </li>
          <li>
            <span class="icon"><img src="img/logout.svg"></span>
            <span class="text">Sair</span>
          </li>

          ${
            window.location.pathname.includes("/admin.html") ?
            `<li>
                <span class="icon"><img src="img/grupo.svg"></span>
                <span class="text">Funcionários</span>
             </li>` : ""
          }
        </ul>
      </div>
    `
  }
}

customElements.define("custom-sidebar", Sidebar)
