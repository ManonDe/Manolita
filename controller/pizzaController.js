'use strict';


 //Récupération des schémas
 
 const pizzaSchema = require('../model/pizza');
 
 
  //Récupération des modules
   
  const express = require('express');
  const router = express.Router();
  
/*******************************************************************************
 *********************************Routes**************************************** 
 ******************************************************************************/
 
 //Permet de voir la liste des pizzas disponibles dans la base de données
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

//Permet d'ajouter une pizza grâce au POST d'arc 
router.post('/', (req, res, next) => {   //insère les pizzas
  let pizza = new pizzaSchema(req.body);
  return pizza.save()
  .then((onePizza) => {
    global.io.emit('new pizza' , onePizza)
      return res.json(onePizza);
  })
  .catch((error) => {
      console.log(error);
      res.send(error);
  });
});

//Permet de modifier les pizzas
router.put('/:id', (req, res) => {
  return pizzaSchema.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
  .then((pizzaUpdated) => {
      return res.json(pizzaUpdated);
  })
  .catch((error) => {
      console.log(error);
      res.send(error);
  });
});

//Permet de supprimer les pizzas
router.delete('/:id', (req, res) => {
  return pizzaSchema.remove({_id: req.params.id})
  .then((results) => {
      return res.json(results);
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