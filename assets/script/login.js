const LOGIN = document.getElementById("ipt-login").value;
const SENHA = document.getElementById("ipt-senha").value;
const BTN_LOGIN = document.getElementById("btn-login");

function login() {
  window.location = "./Visual/index.html";
};

BTN_LOGIN.addEventListener('click', login);
