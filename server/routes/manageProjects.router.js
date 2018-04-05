//router out to database
const pool = require('../modules/pool.js');
let express = require('express');
let router = express.Router();

//GET history of projects
router.get('/', (req, res) => {
  let queryText = "SELECT * FROM projects;";
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error in manageProjectsRouter GET', error);
      res.send(500);
    });
});

//POST entry
router.post('/', (req, res) => {
  const queryText = "INSERT INTO projects (project_name) VALUES ($1);";
  pool.query(queryText, [req.body.project_name])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error in manageProjectsRouter POST', err);
      res.sendStatus(500);
    });
});

//DELETE project
router.delete('/:id', (req, res) => {
  const projectId = req.query.id;
  pool.delete('DELETE FROM "projects" WHERE "projects_id" = $1;', [projectId])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('router error making project delete query', error);
      res.sendStatus(500);
    });
});

module.exports = router;