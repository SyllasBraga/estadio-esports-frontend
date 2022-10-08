const table = document.getElementById("table");
const btn_cad_adm = document.getElementById("btn-cad-adm");
const cad_adm = document.getElementById("cad-adm");
const cad_cancel = document.getElementById("btn-cancel");
const main = document.getElementById("main");
const btn_save = document.getElementById("btn-save");
const card_upt_adm = document.getElementById("upt-adm");
const btn_save_upt = document.getElementById("btn-save-upt");
const upt_adm = document.getElementById("adms-row");
const cancel_upt = document.getElementById("btn-cancel-upt");
const save_upt = document.getElementById("btn-save-upt");
let new_nome = document.getElementById("new-nome");
let new_sobrenome = document.getElementById("new-sobrenome");
let new_login = document.getElementById("new-login");
let new_cpf = document.getElementById("new-cpf");
let new_salario = document.getElementById("new-salario");
let new_datanasc = document.getElementById("new-datanasc");
let new_senha = document.getElementById("new-senha");
let up_nome = document.getElementById("up-nome");
let up_sobrenome = document.getElementById("up-sobrenome");
let up_login = document.getElementById("up-login");
let up_cpf = document.getElementById("up-cpf");
let up_salario = document.getElementById("up-salario");
let up_datanasc = document.getElementById("up-datanasc");
let up_senha = document.getElementById("up-senha");
var linhas = table.getElementsByTagName("tr");

//Ações na API
let administrador = JSON.stringify({
  "cpf": "621.707.810-48",
  "nome": "André",
  "sobrenome": "José",
  "dataNascimento": "2001-09-19",
  "login": "andre@gmail.com",
  "senha": "12345678",
  "salario": 1999.0
});

const init_post = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: {
    "cpf": "621.707.810-48",
    "nome": "André",
    "sobrenome": "José",
    "dataNascimento": "2001-09-19",
    "login": "andre@gmail.com",
    "senha": "12345678",
    "salario": 1999.0
  }
}
const post_adms = fetch("http://localhost:8080/administradores", init_post)
  .then("Foi!").catch((erro) => { console.log(erro); });

const get_adms = fetch("http://localhost:8080/administradores",
  {
    headers: {
      'Authorization': 'Basic ' + btoa(`pedro@estadio-esports.com:12345678`)
    }
  }
)
  .then(response => {
    response.json().then(data => showData(data));
  });

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
    var salario = document.createTextNode(result[cont].salario);
    td.appendChild(salario);
    var td = document.createElement("td");
    tr.appendChild(td);
    var dataNasc = document.createTextNode(formataData(result[cont].dataNascimento));
    td.appendChild(dataNasc);
    tr.appendChild(td);
  }
}

//Ações nas páginas
function showCad() {
  cad_adm.classList.add("cad-adm-visible");
  main.classList.add("main-filter")
}

function ocultCad() {
  cad_adm.classList.remove("cad-adm-visible");
  main.classList.remove("main-filter");
}

function salvaDados() {
  let administrador = {
    "cpf": new_cpf.value,
    "nome": new_nome.value,
    "sobrenome": new_sobrenome.value,
    "dataNascimento": new_datanasc.value,
    "login": new_login.value,
    "senha": new_senha.value,
    "salario": new_salario.value
  }
  ocultCad();
  console.log(administrador);
}

function showCardUpdate() {
  pegaLinha();
  card_upt_adm.classList.add("upt-adm-visible");
  main.classList.add("main-filter");
}

function ocultCardUpdate() {
  card_upt_adm.classList.remove("upt-adm-visible");
  main.classList.remove("main-filter");
  linha.classList.remove("selecionado");

}

function saveUpdate() {
  let administradorAtual = {
    "cpf": up_cpf.value,
    "nome": up_nome.value,
    "sobrenome": up_sobrenome.value,
    "dataNascimento": up_datanasc.value,
    "login": up_login.value,
    "senha": up_senha.value,
    "salario": up_salario.value
  }
  ocultCardUpdate();
  console.log(administradorAtual);
}

function pegaLinha(){
  linha.classList.add("selecionado");
	var selecionados = table.getElementsByClassName("selecionado");
  for(var i = 0; i < selecionados.length; i++){
  	var selecionado = selecionados[i];
    selecionado = selecionado.getElementsByTagName("td");
    up_nome.value = selecionado[0].innerHTML;
    up_sobrenome.value = selecionado[1].innerHTML;
    up_login.value = selecionado[2].innerHTML;
    up_cpf.value = selecionado[3].innerHTML;
    up_salario.value = selecionado[4].innerHTML;
    up_datanasc.value = selecionado[5].innerHTML;
  }
}

btn_cad_adm.addEventListener("click", showCad);
cad_cancel.addEventListener("click", ocultCad);
btn_save.addEventListener("click", salvaDados);
cancel_upt.addEventListener("click", ocultCardUpdate);
save_upt.addEventListener("click", saveUpdate);

for(var i = 0; i < linhas.length; i++){
	var linha = linhas[i];
  linha.addEventListener("dblclick", showCardUpdate);
}

console.log(linhas.length)