//Otoniel Palacios Dev.

const $plSend = document.querySelector("#lost-send");
const $dSend = document.querySelector("#dirigida-send");
const $valuePL = document.querySelector(".pl-found");
const $pzasFaltantes = document.querySelector(".pl-faltates");
const $cumplimiento = document.querySelector(".cumplimiento");
const $reset = document.querySelector(".reset");
const $dirigidaSend = document.querySelector('#dirigida-send');
const $cuimplimientoDirigida = document.querySelector('.cumplimiento-dirigida');
const $dirigidaEnd = document.querySelector('.dirigida-end');
const $dirigidaFaltante = document.querySelector('.dirigida-rest');

let metaPending = 160;
let pzasFound = 0;
let metaDirigida = 4;
let pzasFdDirigida = 0;
const dayliCalculate = 160;
const dayliCalculateDirigida = 4;

window.onload = function () {
  const storedPzasFound = localStorage.getItem("pzasFound");
  const storedMetaPending = localStorage.getItem("metaPending");
  const storedPzasFdDirigida = localStorage.getItem("pzasFdDirigida");
  const storedMetaDirigida = localStorage.getItem("metaDirigida");

  if (storedPzasFound !== null) {
    pzasFound = parseFloat(storedPzasFound);
    $valuePL.textContent = `Pzas. Encontradas: ${pzasFound}`;
  }

  if (storedMetaPending !== null) {
    metaPending = parseFloat(storedMetaPending);
    $pzasFaltantes.textContent = `Pzas. Faltantes: ${metaPending}`;
  }

  if (storedPzasFdDirigida !== null) {
    pzasFdDirigida = parseFloat(storedPzasFdDirigida);
    $dirigidaEnd.textContent = `Módulos Finalizados: ${pzasFdDirigida}`;
  }

  if (storedMetaDirigida !== null) {
    metaDirigida = parseFloat(storedMetaDirigida);
    $dirigidaFaltante.textContent = `Módulos Pendientes: ${metaDirigida}`;
  }

  updateCumplimiento();
  dirigida();
};

function updateCumplimiento() {
  let cumplimiento = (pzasFound / dayliCalculate) * 100;
  $cumplimiento.textContent = `Cumplimiento: ${cumplimiento.toFixed(2)}%`;
}

function dirigida() {
  let cumplimientoDirigida = (pzasFdDirigida / dayliCalculateDirigida) * 100;
  $cuimplimientoDirigida.textContent = `Cumplimiento: ${cumplimientoDirigida.toFixed(2)}%`;
}

$plSend.addEventListener("click", (event) => {
  event.preventDefault();
  const plInput = parseFloat(document.querySelector("#pending-input").value);

  if (!plInput) {
    alert("No se ha introducido un valor válido");
    return;
  } else {
    pzasFound += plInput;
    $valuePL.textContent = `Pzas. Encontradas: ${pzasFound}`;

    metaPending = metaPending - plInput;
    $pzasFaltantes.textContent = `Pzas. Faltantes: ${metaPending}`;

    localStorage.setItem("pzasFound", pzasFound);
    localStorage.setItem("metaPending", metaPending);
    updateCumplimiento();
    document.querySelector("#pending-input").value = "";
  }
});

$reset.addEventListener("click", () => {
  pzasFound = 0;
  metaPending = 160;
  pzasFdDirigida = 0;
  metaDirigida = 4;

  updateCumplimiento();
  dirigida();

  $valuePL.textContent = `Pzas. Encontradas: ${pzasFound}`;
  $pzasFaltantes.textContent = `Pzas. Faltantes: ${metaPending}`;
  $dirigidaEnd.textContent = `Módulos Finalizados: ${pzasFdDirigida}`;
  $dirigidaFaltante.textContent = `Módulos Pendientes: ${metaDirigida}`;

  localStorage.setItem("pzasFound", pzasFound);
  localStorage.setItem("metaPending", metaPending);
  localStorage.setItem("pzasFdDirigida", pzasFdDirigida);
  localStorage.setItem("metaDirigida", metaDirigida);
});

$dirigidaSend.addEventListener("click", (event) => {
  event.preventDefault();
  const dirigidaFd = parseFloat(document.querySelector("#dirigida-input").value);

  if (!dirigidaFd) {
    alert("No se ha introducido un valor válido");
    return;
  } else {
    pzasFdDirigida += dirigidaFd;
    $dirigidaEnd.textContent = `Módulos Finalizados: ${pzasFdDirigida}`;

    metaDirigida = metaDirigida - dirigidaFd;
    $dirigidaFaltante.textContent = `Módulos Pendientes: ${metaDirigida}`;

    dirigida();
    document.querySelector("#dirigida-input").value = "";

    localStorage.setItem("pzasFdDirigida", pzasFdDirigida);
    localStorage.setItem("metaDirigida", metaDirigida);
  }
});
