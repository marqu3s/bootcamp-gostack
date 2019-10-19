const express = require('express');

const app = new express();

// Enable json for body parsing.
app.use(express.json());

// Projects array
const projects = [];

// Total requests counter
let totalRequests = 0;




/*** MIDDLEWARES ***/

/**
 * Middleware that check if a project exists.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function projectExists(req, res, next) {
 const {id} = req.params;
 const project = projects.find(p => p.id == id);

 if (!project) {
   return res.status(400).json({error: 'Project does not exists.'});
 }

 return next();
}

/**
 * Middleware that counts the number of total requests made.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function countRequests(req, res, next) {
  totalRequests++;
  console.log(`Total requests: ${totalRequests}.`);
  return next();
}




/*** ROUTES ***/

app.use(countRequests);

app.post('/projects', (req, res) => {
  const {id, title} = req.body;
  const newProject = {id, title, tasks: []};
  projects.push(newProject);
  return res.json(newProject);
});

app.get('/projects', (req, res) => {
  return res.json(projects);
});

app.put('/projects/:id', projectExists, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;
  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(project);
});

app.delete('/projects/:id', projectExists, (req, res) => {
  const {id} = req.params;
  const index = projects.findIndex(p => p.id == id);
  projects.splice(index, 1);

  return res.send();
});

app.post('/projects/:id/tasks', projectExists, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;
  const project = projects.find(p => p.id == id);
  project.tasks.push(title);

  return res.json(project);
});

app.listen(3333);