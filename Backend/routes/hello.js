// imports
import express from 'express';




var helloRouter = express.Router();

/* GET users listing. */
helloRouter.get('/', function(req, res, next) {
  res.send('hello world');
});

export default helloRouter;
