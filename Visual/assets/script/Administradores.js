const table = document.getElementById("tbl-content");
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
const btn_editar = document.getElementById("btn-editar");
const card_delete = document.getElementById("card-confirm-delete");
const btn_cad_delete = document.getElementById("btn-actions-delete");
const home = document.querySelector("body");
const btn_ok = document.getElementById("btn-ok");
const div_delete_error = document.getElementById("card-delete-error");
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
let linhas = document.getElementsByClassName("adms-row");
let post_error = document.getElementById("post-error");

function validaDados() {
  post_error.style.display = "flex";
}

function fazPost(administrador) {
  fetch("http://localhost:8080/administradores", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`joao@estadio-esports.com:12345678`)
    },
    body: JSON.stringify(administrador)
  }).then((result) => {
    if (result.status == 200) {
      for (let i = 0; i < linhas.length; i++) {
        var linha = linhas[i];
        linha.remove();
      }
      document.getElementById("tbl-body").remove();
      fazGet();
      ocultCad();
    } else {
      validaDados();
    }
  }).catch((erro) => {
    console.log(erro);
  });
}

function fazGet() {
  fetch("http://localhost:8080/administradores",
    {
      headers: {
        'Authorization': 'Basic ' + btoa(`joao@estadio-esports.com:12345678`)
      }
    }
  )
    .then(response => {
      response.json().then(data => showData(data));
    });
}

function fazDelete(id) {
  fetch(`http://localhost:8080/administradores/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`joao@estadio-esports.com:12345678`)
    }
  }).then((result) => {
    if (result.status == 200) {
      for (let i = 0; i < linhas.length; i++) {
        var linha = linhas[i];
        linha.remove();
      }
      document.getElementById("tbl-body").remove();
      fazGet();
    } else {
      main.classList.add("main-filter")
      div_delete_error.classList.add("card-delete-error");
    }
  })
}
function formataData(dataAntiga) {
  let data = new Date(dataAntiga);
  let dataFormatada = ((data.getDate())) + "/" +
    ((data.getMonth() + 1)) + "/" + data.getFullYear();
  return dataFormatada;
}

const showData = (result) => {
  let tbl_body = document.createElement("table");
  tbl_body.setAttribute("id", "tbl-body");
  table.appendChild(tbl_body);
  for (let cont = 0; cont < result.length; cont++) {
    var tr = document.createElement("tr");
    tbl_body.appendChild(tr);
    tr.setAttribute("id", "adms-row");
    tr.setAttribute("class", "adms-row");
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
    var td = document.createElement("td");
    var btn_editar = document.createElement("button");
    btn_editar.setAttribute("id", "btn-editar");
    var editar = document.createTextNode("Editar");
    btn_editar.appendChild(editar);
    td.appendChild(btn_editar);
    var btn_excluir = document.createElement("button");
    btn_excluir.setAttribute("id", "btn-excluir");
    var excluir = document.createTextNode("Excluir");
    btn_excluir.appendChild(excluir);
    td.appendChild(btn_excluir);
    tr.appendChild(td);
    btn_editar.addEventListener("click", showCadUpdate);
    btn_excluir.addEventListener("click", function () {
      createCardDelete(result[cont].id);
      main.classList.add("main-filter");
    });
  }
}

function createCardDelete(id) {
  var div_delete = document.createElement("div");
  div_delete.setAttribute("id", "card-confirm-delete");
  div_delete.setAttribute("class", "confirm-delete-visible");
  home.appendChild(div_delete);
  var div_warning = document.createElement("div");
  div_warning.setAttribute("class", "warning");
  div_delete.appendChild(div_warning);
  var p_warning = document.createElement("p")
  let text = document.createTextNode("Você realmente deseja exluir o cadastro do/da")
  p_warning.appendChild(text);
  div_warning.appendChild(p_warning);
  let div_btn_actions_delete = document.createElement("div");
  div_btn_actions_delete.setAttribute("class", "btn-actions-delete");
  div_btn_actions_delete.setAttribute("id", "btn-actions-delete");
  let btn_nao = document.createElement("button");
  btn_nao.setAttribute("id", "btn-nao");
  var text_nao = document.createTextNode("Não");
  btn_nao.appendChild(text_nao);
  btn_nao.addEventListener("click", ocultCadDelete);
  var btn_sim = document.createElement('button');
  var text_sim = document.createTextNode("Sim");
  btn_sim.setAttribute("id", "btn-sim");
  btn_sim.appendChild(text_sim);
  btn_sim.addEventListener('click', function () {
    fazDelete(id);
    ocultCadDelete();
  });
  div_btn_actions_delete.appendChild(btn_nao);
  div_btn_actions_delete.appendChild(btn_sim);
  div_delete.appendChild(div_btn_actions_delete);
}

function showCad() {
  cad_adm.classList.add("cad-adm-visible");
  main.classList.add("main-filter")
}

function ocultCad() {
  cad_adm.classList.remove("cad-adm-visible");
  main.classList.remove("main-filter");
}

function showCadUpdate() {
  card_upt_adm.classList.add("upt-adm-visible");
  main.classList.add("main-filter")
}

function ocultCadUpdate() {
  card_upt_adm.classList.remove("upt-adm-visible");
  main.classList.remove("main-filter")
}

function ocultCadDelete() {
  var node = document.getElementById("card-confirm-delete");
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
  main.classList.remove("main-filter")

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
  fazPost(administrador);
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
  ocultCadUpdate();
  console.log(administradorAtual);
}

window.onload = fazGet;
btn_cad_adm.addEventListener("click", showCad);
cad_cancel.addEventListener("click", ocultCad);
btn_save.addEventListener("click", salvaDados);
cancel_upt.addEventListener("click", ocultCadUpdate);
btn_ok.addEventListener("click", function(){
  main.classList.remove("main-filter")
  div_delete_error.classList.remove("card-delete-error");
});