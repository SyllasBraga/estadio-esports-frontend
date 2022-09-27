const table = document.getElementById("adms-row");

const showData = (result) => {
  for(const campo in result){
    table.innerHTML = "<td> " + result[campo].nome + "</td>";
    table.innerHTML = "<td> " + result[campo].sobrenome + "</td>";
    table.innerHTML = "<td> " + result[campo].login + "</td>";
    table.innerHTML = "<td> " + result[campo].cpf + "</td>";
    table.innerHTML = "<td> " + result[campo].salario + "</td>";
    table.innerHTML = "<td> " + result[campo].dataNascimento + "</td>";

    console.log (result[campo]);
  }
}

const LISTA_ADMS = fetch("http://localhost:8080/administradores")
  .then(response => {
    response.json()
    .then(data => showData(data));
  });



