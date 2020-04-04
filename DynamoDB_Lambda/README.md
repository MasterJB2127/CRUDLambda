# lambda-nodejs-dynamodb

_Adjunto al proyecto se encuentra un archivo .http, puede instalar la extension para VSCODE y realizar las pruebas ahi mismo_

Esta es la llamada a los puntos finales:

### Para ingresar un registro
POST https://yal7hh6nfa.execute-api.us-east-1.amazonaws.com/dev/libros
Content-Type: application/json

{
	"title":"",
	"description": "", 
	"price":
}

### Para leer todos los registros
GET  https://yal7hh6nfa.execute-api.us-east-1.amazonaws.com/dev/libros


### Para buscar un registro por id
GET https://yal7hh6nfa.execute-api.us-east-1.amazonaws.com/dev/libros/{id}

### Para actualizar un registro por su id
PUT https://yal7hh6nfa.execute-api.us-east-1.amazonaws.com/dev/libros/{id}
Content-Type: application/json

{
	"title":"",
	"description": ""
}

### Para borrar un registro por su id
DELETE https://yal7hh6nfa.execute-api.us-east-1.amazonaws.com/dev/libros/{id}

