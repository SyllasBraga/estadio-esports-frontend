async function get() {
    try {
      const response = await fetch("http://localhost:8080/administradores");
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  }