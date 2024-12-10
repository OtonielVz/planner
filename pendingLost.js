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
const $cazaLostFaltante = document.querySelector('.caza-lost-pendientes');
const $cazaEnviar = document.querySelector('#cazaSend');
const $cumplimientoCaza = document.querySelector('.caza-lost-cumplimiento');
const $cazaLostEnd = document.querySelector('.caza-lost-end');


let metaPending = 160;
let pzasFound = 0;
let pzasFoundCaza = 0;
let metaDirigida = 4;
let metaCazaLost = 60;
let pzasFdDirigida = 0;
const dayliCalculate = 160;
const dayliCalculateCaza = 60;
const dayliCalculateDirigida = 4;

window.onload = function () {
  const storedMetaPending = localStorage.getItem("metaPending");
  const storedPzasFound = localStorage.getItem("pzasFound");
  const storedMetaDirigida = localStorage.getItem("metaDirigida");
  const storedPzasFdDirigida = localStorage.getItem("pzasFdDirigida");
  const storageMetaCazaLost = localStorage.getItem('metaCazaLost');
  const storageFdCaza = localStorage.getItem("pzasFoundCaza");

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
  if(storageFdCaza !== null){
    pzasFoundCaza = parseFloat(storageFdCaza);
    $cazaLostEnd.textContent = `Pzas. Encontradas: ${pzasFoundCaza}`;
  }

  if(storageMetaCazaLost !== null){
    metaCazaLost = parseFloat(storageMetaCazaLost);
    $cazaLostFaltante.textContent = `Pzas. Faltantes: ${metaCazaLost}`;
  }
  updateCumplimiento();
  dirigida();
  cazaLost();
};

function updateCumplimiento() {
  let cumplimiento = (pzasFound / dayliCalculate) * 100;
  $cumplimiento.textContent = `Cumplimiento: ${cumplimiento.toFixed(2)}%`;
}

function dirigida() {
  let cumplimientoDirigida = (pzasFdDirigida / dayliCalculateDirigida) * 100;
  $cuimplimientoDirigida.textContent = `Cumplimiento: ${cumplimientoDirigida.toFixed(2)}%`;
}
function cazaLost() {
  let cumplimientoCaza = (pzasFoundCaza / dayliCalculateCaza) * 100;
  $cumplimientoCaza.textContent = `Cumplimiento: ${cumplimientoCaza.toFixed(2)}%`;
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
  pzasFoundCaza = 0;
  metaCazaLost = 60;
  cazaLost();
  updateCumplimiento();
  dirigida();

  $valuePL.textContent = `Pzas. Encontradas: ${pzasFound}`;
  $pzasFaltantes.textContent = `Pzas. Faltantes: ${metaPending}`;
  $dirigidaEnd.textContent = `Módulos Finalizados: ${pzasFdDirigida}`;
  $dirigidaFaltante.textContent = `Módulos Pendientes: ${metaDirigida}`;
  $cazaLostEnd.textContent = `Pzas. Encontradas: ${pzasFoundCaza}`;
  $cazaLostFaltante.textContent = `Pzas. Faltantes: ${metaCazaLost}`;

  localStorage.setItem("pzasFound", pzasFound);
  localStorage.setItem("metaPending", metaPending);
  localStorage.setItem("pzasFdDirigida", pzasFdDirigida);
  localStorage.setItem("metaDirigida", metaDirigida);
  localStorage.setItem("metaCazaLost", metaCazaLost);
  localStorage.setItem("pzasFoundCaza", pzasFoundCaza);
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


$cazaEnviar.addEventListener('click', (event)=>{
  event.preventDefault();
  const cazaFd = parseFloat(document.querySelector('#caza-input').value);

  if(!cazaFd){
    alert("No se ha introducido un valor válido");
  } else{
    pzasFoundCaza += cazaFd;
    $cazaLostEnd.textContent = `Pzas. Encontradas: ${pzasFoundCaza}`;

    metaCazaLost = metaCazaLost - cazaFd;
    $cazaLostFaltante.textContent = `Pzas. Faltantes: ${metaCazaLost}`;
    
    cazaLost();
    document.querySelector("#caza-input").value = "";

    localStorage.setItem("pzasFoundCaza", pzasFoundCaza);
    localStorage.setItem("metaCazaLost", metaCazaLost);
  }
});


function exportToCSV() {


  const data = [
    ["Fecha", "Pzas. Encontradas", "Pzas. Faltantes", "Módulos Finalizados", "Módulos Pendientes", "Pzas. Encontradas Caza", "Pzas. Faltantes Caza", "Cumplimiento", "Cumplimiento Dirigida", "Cumplimiento Caza"],
    [new Date().toLocaleDateString(), 
     pzasFound, 
     metaPending, 
     pzasFdDirigida, 
     metaDirigida, 
     pzasFoundCaza, 
     metaCazaLost, 
     ((pzasFound / dayliCalculate) * 100).toFixed(2), 
     ((pzasFdDirigida / dayliCalculateDirigida) * 100).toFixed(2), 
     ((pzasFoundCaza / dayliCalculateCaza) * 100).toFixed(2)]
  ];


  let csvContent = "data:text/csv;charset=utf-8," 
                   + data.map(row => row.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "datos_semanales.csv");
  
  link.click();
}

const exportD = document.querySelector('#export-csv');

exportD.addEventListener('click', ()=>{
  exportToCSV();
});
