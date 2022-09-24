const LOGIN = document.getElementById("ipt-login").value;
const SENHA = document.getElementById("ipt-senha").value;

let auth = "Authorization: Basic " + btoa(LOGIN+":"+SENHA);

(function login() {
  console.log(auth)
  fetch("http://localhost:8080/", {
    mode: 'no-cors',
    headers:{
      auth
    },
  }).then(response => {
    if (!response.ok) {
      return response.status;
    }
    return response.json();
  })
})();
