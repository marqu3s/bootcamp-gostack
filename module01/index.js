const express = require('express');

const server = express();
server.use(express.json());

// Global middleware: This is executed for all requests.
server.use((req, res, next) => {
  // Middleware stuff here.
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  // Continue execution.
  next();

  console.timeEnd('Request');
});

// Ways to send values from the front to the backend:
// Query params = ?teste=1
// Route params = /users/1
// Request body = { name: "John" }

const users = ['Ironman', 'Thor', 'Loki', 'Hulk'];

// Local middleware for some routes.
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({error: 'User name not found in request body.'});
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({error: 'User does not exists.'});
  }

  req.user = user;

  return next();
}

// Example URL: http://localhost:3000/users/1/?name=john
server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post('/users', checkUserExists, (req, res) => {
  const {name} = req.body;
  users.push(name);

  return res.json(users);
});

server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const {index} = req.params;
  const {name} = req.body;
  users[index] = name;

  return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const {index} = req.params;
  users.splice(index, 1);

  return res.send();
});

server.listen(3333);