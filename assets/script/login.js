const LOGIN = document.getElementById("ipt-login");
const SENHA = document.getElementById("ipt-senha");
const BTN_LOGIN = document.getElementById("btn-login");
const MSG_ERRO = document.getElementById("erro-login");

function verificaErro() {
  LOGIN.classList.add("erro");
  SENHA.classList.add("erro");
  MSG_ERRO.style.display = "flex";
}

function login() {
   fetch('http://localhost:8080/login', {
     method: 'GET',
     headers: { 'Authorization': 'Basic ' + btoa(`${LOGIN.value}:${SENHA.value}`) }
   })
     .then(response => response.status==200? window.location = "http://127.0.0.1:5500/Visual/" : 
     verificaErro());
}
BTN_LOGIN.addEventListener('click', login);
