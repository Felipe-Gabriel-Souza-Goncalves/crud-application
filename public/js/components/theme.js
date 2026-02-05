// class Theme extends HTMLElement {
//   static lightTheme = true;
//   static instances = new Set();

//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     Theme.instances.add(this);
//     this.render();
//   }

//   disconnectedCallback() {
//     Theme.instances.delete(this);
//   }

//   static toggleTheme(value) {
//     Theme.lightTheme = value;

//     // força re-render em todas as instâncias
//     Theme.instances.forEach(el => el.render());
//   }

//   render() {
//     this.innerHTML = `
//       ${
//         Theme.lightTheme
//           ? `<img src="img/tema claro.svg" data-theme="dark">`
//           : `<img src="img/tema escuro.svg" data-theme="light">`
//       }
//     `;

//     this.querySelector('img').onclick = () => {
//       Theme.toggleTheme(!Theme.lightTheme);
//     };
//   }
// }

// customElements.define('custom-theme', Theme);
