const table = document.getElementById("table");

const showData = (result, response) => {
  for(const campo in result){
    var tr = document.createElement("tr");
    tr.setAttribute("id", "adms-row");
    table.appendChild(tr);
    for (let i = 0; i < response.length; i++) {
      var td = document.createElement("td");
      td.appendChild(response.json()); 
    }
  }
}

fetch("http://localhost:8080/administradores")
  .then(response => {
    response.json()
    .then(data => showData(data, response));
  });



