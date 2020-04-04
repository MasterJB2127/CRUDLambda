### Ingresar un registro
POST https://yal7hh6nfa.execute-api.us-east-1.amazonaws.com/dev/libros
Content-Type: application/json

{
	"title":"",
	"description": "", 
	"price":12
}

### Leer todos lo que contiene la base de datos
GET  https://yal7hh6nfa.execute-api.us-east-1.amazonaws.com/dev/libros


### Buscar un registro especifico
GET https://yal7hh6nfa.execute-api.us-east-1.amazonaws.com/dev/libros/{id}

### Actualizar un registro por id
PUT https://yal7hh6nfa.execute-api.us-east-1.amazonaws.com/dev/libros/{id}
Content-Type: application/json

{
	"title":"",
	"description": "",
	"price":12
}

### Borrar un registro específico
DELETE https://yal7hh6nfa.execute-api.us-east-1.amazonaws.com/dev/libros/{id}

