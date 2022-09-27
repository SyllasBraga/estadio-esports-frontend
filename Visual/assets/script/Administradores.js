const showData = (result) => {
  for(const campo in result){
    console.log (result[campo]);
  }
}

const LISTA_ADMS = fetch("http://localhost:8080/administradores")
  .then(response => {
    response.json()
    .then(data => showData(data));
  });



