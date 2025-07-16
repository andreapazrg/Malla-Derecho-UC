const mallaData = [
  {
    semestre: "Primer año - Semestre 1",
    ramos: [
      { nombre: "Derecho Romano I", abre: ["Derecho Romano II"] },
      { nombre: "Fundamentos Filosóficos del Derecho", abre: ["Derecho Natural"] },
      { nombre: "Historia del Derecho" },
      { nombre: "Teoría y Fuentes del Derecho" },
      { nombre: "Introducción a la Economía" },
      { nombre: "Desarrollo de Habilidades Comunicativas para Abogados" },
      { nombre: "Taller de Metodología de la Investigación" },
    ]
  },
  {
    semestre: "Primer año - Semestre 2",
    ramos: [
      { nombre: "Derecho Romano II", requiere: ["Derecho Romano I"] },
      { nombre: "Derecho Natural", requiere: ["Fundamentos Filosóficos del Derecho"] },
      { nombre: "Historia de las Instituciones Jurídicas, Políticas y Sociales" },
      { nombre: "Derecho Político" },
      { nombre: "Derecho Económico I" },
      { nombre: "Curso Teológico" },
    ]
  }
  // Puedes seguir agregando más semestres aquí
];

const estadoRamos = {};

function crearMalla() {
  const container = document.getElementById("malla");

  mallaData.forEach((sem) => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = sem.semestre;
    semDiv.appendChild(titulo);

    sem.ramos.forEach((ramo) => {
      const ramoDiv = document.createElement("div");
      ramoDiv.className = "ramo";
      ramoDiv.id = ramo.nombre;

      const label = document.createElement("span");
      label.textContent = ramo.nombre;

      const btn = document.createElement("button");
      btn.textContent = "Aprobar";
      btn.onclick = () => aprobarRamo(ramo.nombre);

      ramoDiv.appendChild(label);
      ramoDiv.appendChild(btn);

      semDiv.appendChild(ramoDiv);

      estadoRamos[ramo.nombre] = {
        aprobado: false,
        requiere: ramo.requiere || [],
        abre: ramo.abre || [],
        div: ramoDiv,
        btn,
      };
    });

    container.appendChild(semDiv);
  });

  actualizarEstado();
}

function aprobarRamo(nombre) {
  estadoRamos[nombre].aprobado = true;
  actualizarEstado();
}

function actualizarEstado() {
  for (const nombre in estadoRamos) {
    const ramo = estadoRamos[nombre];
    const puedeAprobar = ramo.requiere.every(
      (req) => estadoRamos[req] && estadoRamos[req].aprobado
    );

    ramo.div.classList.toggle("aprobado", ramo.aprobado);
    ramo.div.classList.toggle("locked", !puedeAprobar && !ramo.aprobado);
    ramo.btn.disabled = !puedeAprobar || ramo.aprobado;
  }
}

document.addEventListener("DOMContentLoaded", crearMalla);

