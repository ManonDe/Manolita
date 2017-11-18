'use strict';

/**
 * Récupération des schémas
 **/
 const pizzaSchema = require('../model/pizzaSchema');
 
 /**
  * Récupération des modules
  **/ 
  const express = require('express');
  const router = express.Router();
  
/*******************************************************************************
 *********************************Routes**************************************** 
 ******************************************************************************/ 
router.get('/', (req, res, next) => {   //récupère les pizzas
  return pizzaSchema.find()
  .then((allPizzas) => {
      return res.json(allPizzas);
  })
  .catch((error) => {
      console.log(error);
      res.send(error);
  });
});

router.post('/', (req, res, next) => {   //insère les pizzas
  let pizzaSchema = new pizzaSchema(req.body);
  return pizzaSchema.save()
  .then((onePizza) => {
    global.io.emit('new pizza' , onePizza)
      return res.json(onePizza);
  })
  .catch((error) => {
      console.log(error);
      res.send(error);
  });
});


/*******************************************************************************
 ********************************Events*****************************************
 ******************************************************************************/ 
const pizzaEvent = (ServerEvent) => {
  ServerEvent.on('myEvent', (data, socket) => {
    console.log('This is myEvent call');
    ServerEvent.emit('myEventDone', data, socket);
  });
};

// Export
module.exports.pizzaEvent = pizzaEvent;
module.exports.router = router;