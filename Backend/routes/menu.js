// imports
import express from 'express';
import MenuDb from '../db/conn.js'


var menuRouter = express.Router();

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}


/* GET users listing. */
menuRouter.get('/', async (req, res)=>{
  console.log('incoming request')
  let collection = await MenuDb.collection("Daily Meal");

  const date = new Date;
  
  const query = {
    DATA:{$gt:date.addDays(-2)}
  }

  let results = await collection.find(query).toArray();
  
  res.send(results).status(200);
});

export default menuRouter;
