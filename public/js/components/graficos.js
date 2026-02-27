const barras = document.getElementById("graf-barras");
const linha = document.getElementById("graf-linha");
const pizza = document.getElementById("graf-pizza");

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function createChart(element, type) {

  let dataConfig = {};

  if (type === "bar") {
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

    const vendasOnline = meses.map(() => random(80, 200));
    const vendasFisicas = meses.map(() => random(50, 150));

    dataConfig = {
      labels: meses,
      datasets: [
        {
          label: "Vendas Online",
          data: vendasOnline,
          backgroundColor: "rgba(54, 162, 235, 0.7)"
        },
        {
          label: "Loja Física",
          data: vendasFisicas,
          backgroundColor: "rgba(255, 99, 132, 0.7)"
        }
      ]
    };
  } else if (type === "line") {
    const mesesAno = [
      "Jan","Fev","Mar","Abr","Mai","Jun",
      "Jul","Ago","Set","Out","Nov","Dez"
    ];

    let total = 1000;
    const crescimento = mesesAno.map(() => {
      total += random(50, 200);
      return total;
    });

    dataConfig = {
      labels: mesesAno,
      datasets: [{
        label: "Usuários Ativos",
        data: crescimento,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        fill: true
      }]
    };
  } else if (type === "pie") {
    const fontes = ["Orgânico", "Pago", "Social", "Direto"];

    dataConfig = {
      labels: fontes,
      datasets: [{
        data: [
          random(300, 800),
          random(200, 600),
          random(150, 500),
          random(100, 400)
        ],
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FF9800",
          "#9C27B0"
        ]
      }]
    };
  }

  const grafico = new Chart(element, {
    type: type,
    data: dataConfig,
    options: {
      responsive: true,
      scales: type !== "pie" ? {
        y: {
          beginAtZero: true
        }
      } : {},
      animations: {
        colors: false
      }
    }
  });

  atualizarCorGrafico(grafico);
  return grafico;
}
function atualizarCorGrafico(grafico){
  if(!grafico){
    console.log("Não há um elemento referenciando um gráfico")
    return
  }

  const dataset = grafico.data.datasets[0]
  const accent = getComputedStyle(document.documentElement)
                   .getPropertyValue("--accent").trim()

  const quantidade = dataset.data.length

  // Converte qualquer cor CSS para RGB
  function cssToRgb(color){
    const temp = document.createElement("div")
    temp.style.color = color
    document.body.appendChild(temp)

    const rgb = getComputedStyle(temp).color
    document.body.removeChild(temp)

    const result = rgb.match(/\d+/g).map(Number)
    return { r: result[0], g: result[1], b: result[2] }
  }

  // RGB → HSL
  function rgbToHsl(r, g, b){
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r,g,b)
    const min = Math.min(r,g,b)
    let h, s, l = (max + min) / 2

    if(max === min){
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }

      h *= 60
    }

    return { h, s: s * 100, l: l * 100 }
  }

  if (grafico.config.type === 'doughnut' || grafico.config.type === 'pie') {
    const { r, g, b } = cssToRgb(accent)
    const baseHsl = rgbToHsl(r, g, b)

    const passo = 150 / quantidade

    const cores = []
    const coresHover = []

    for(let i = 0; i < quantidade; i++){
      const novoHue = (baseHsl.h + passo * i) % 360

      cores.push(`hsl(${novoHue}, ${baseHsl.s}%, ${baseHsl.l}%)`)
      coresHover.push(`hsl(${novoHue}, ${baseHsl.s}%, ${baseHsl.l * 0.8}%)`)
    }

    dataset.backgroundColor = cores
    dataset.hoverBackgroundColor = coresHover
    dataset.borderColor = cores

  } else {

    dataset.borderColor = accent
    dataset.backgroundColor =
      `color-mix(in srgb, ${accent} 30%, transparent)`
    dataset.hoverBackgroundColor =
      `color-mix(in srgb, ${accent} 70%, black)`
  }

  grafico.update()
}

const graficoBarras = createChart(barras, 'bar')
const graficoLinha = createChart(linha, 'line')
const graficoPizza = createChart(pizza, 'pie')