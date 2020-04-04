'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.submit = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const title = requestBody.title;
  const description = requestBody.description;
  const price = requestBody.price;

  if (typeof title !== 'string' || typeof description !== 'string' || typeof price !== 'number') {
    callback(new Error('Revise su data'));
    return;
  }

  submitCandidateP(candidateInfo(title, description, price))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Creado satisfactoriamente, email ${title}`,
          candidateId: res.id
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `No se puede crear el registro con email ${title}`
        })
      })
    });
};


const submitCandidateP = candidate => {
  const candidateInfo = {
    TableName: process.env.BOOK_TABLE,
    Item: candidate,
  };
  return dynamoDb.put(candidateInfo).promise()
    .then(res => candidate);
};

const candidateInfo = (title, description, price) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    title: title,
    description: description,
    price: price,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};


module.exports.list = (event, context, callback) => {
  var params = {
    TableName: process.env.BOOK_TABLE,
    ProjectionExpression: "id, title, description, price"
  };

  const onScan = (err, data) => {
    if (err) {
      callback(err);
    } else {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          candidates: data.Items
        })
      });
    }

  };

  dynamoDb.scan(params, onScan);

};

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.BOOK_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('No se puede obtenere el registro'));
      return;
    });
};


module.exports.updateBook = (event, context, callback) => {
  const data = JSON.parse(event.body);
  data.id = event.pathParameters.id;

  const params = {
    TableName: process.env.BOOK_TABLE,
    Item: data
  }

  dynamoDb.put(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({message:"Registro actualizado exitosamente!!"}),
      };
      callback(null, response);
    })
    .catch(error => {
      callback(error, params.Item);
      return;
    })

}

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: process.env.BOOK_TABLE,
    Key: {
      id: event.pathParameters.id
    }
  };

  dynamoDb.delete(params).promise()
  .then(result => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({message:"Registro borrado exitosamente!!"}),
    };
    callback(null, response);
  })
  .catch(error => {
    callback(error, params.Key.id);
    return;
  })

}