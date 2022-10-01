const table = document.getElementById("table");
const btn_cad_adm = document.getElementById("btn-cad-adm");
const cad_adm = document.getElementById("cad-adm");
const cad_cancel = document.getElementById("btn-cancel");
const main = document.getElementById("main");


function formataData(dataAntiga) {
  let data = new Date(dataAntiga);
  let dataFormatada = ((data.getDate())) + "/" +
    ((data.getMonth() + 1)) + "/" + data.getFullYear();
  return dataFormatada;
}

const showData = (result) => {
  for (let cont = 0; cont < result.length; cont++) {
    var tr = document.createElement("tr");
    table.appendChild(tr);
    tr.setAttribute("id", "adms-row");
    var td = document.createElement("td");
    tr.appendChild(td);
    var nome = document.createTextNode(result[cont].nome);
    td.appendChild(nome);
    var td = document.createElement("td");
    tr.appendChild(td);
    var sobreNome = document.createTextNode(result[cont].sobrenome);
    td.appendChild(sobreNome);
    var td = document.createElement("td");
    tr.appendChild(td);
    var login = document.createTextNode(result[cont].login);
    td.appendChild(login);
    var td = document.createElement("td");
    tr.appendChild(td);
    var cpf = document.createTextNode(result[cont].cpf);
    td.appendChild(cpf);
    var td = document.createElement("td");
    tr.appendChild(td);
    var salario = document.createTextNode("R$"+result[cont].salario);
    td.appendChild(salario);
    var td = document.createElement("td");
    tr.appendChild(td);
    var dataNasc = document.createTextNode(formataData(result[cont].dataNascimento));
    td.appendChild(dataNasc);
    tr.appendChild(td);
  }
}

fetch("http://localhost:8080/administradores")
  .then(response => {
    response.json().then(data => showData(data));
  });

function showCad() {
  cad_adm.classList.add("cad-adm-visible");
  main.classList.add("main-filter")
}

function ocultCad() {
  cad_adm.classList.remove("cad-adm-visible");
  main.classList.remove("main-filter")
}

btn_cad_adm.addEventListener("click", showCad);
cad_cancel.addEventListener("click", ocultCad);


