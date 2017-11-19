'use strict';


 //Récupération des schémas
 
 const ingredientsSchema = require('../model/ingredientsSchema');
 
 
  //Récupération des modules
   
  const express = require('express');
  const router = express.Router();
  
/*******************************************************************************
 *********************************Routes**************************************** 
 ******************************************************************************/ 
//Permet de retourner la liste des ingrédients insérés dans la base de données 
router.get('/', (req, res, next) => {   //récupère les ingrédients
  return ingredientsSchema.find()
  .then((allIngredients) => {
      return res.json(allIngredients);
  })
  .catch((error) => {
      console.log(error);
      res.send(error);
  });
});
//Permet d'ajouter les ingrédients dans la base de données
router.post('/', (req, res, next) => {   //insère les ingrédients
  let ingredientSchema = new ingredientsSchema(req.body);
  return ingredientSchema.save()
  .then((oneIngredient) => {
    global.io.emit('new ingredients' , oneIngredient);
      return res.json(oneIngredient);
  })
  .catch((error) => {
      console.log(error);
      res.send(error);
  });
});

// Permet de modifier les ingrédients
router.put('/:id', (req, res) => {
  return ingredientsSchema.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
  .then((ingredientsUpdated) => {
      return res.json(ingredientsUpdated);
  })
  .catch((error) => {
      console.log(error);
      res.send(error);
  });
});

//Permet de supprimer les ingrédients
router.delete('/:id', (req, res) => {
  return ingredientsSchema.remove({_id: req.params.id})
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
const ingredientEvent = (ServerEvent) => {
  ServerEvent.on('myEvent', (data, socket) => {
    console.log('This is myEvent call');
    ServerEvent.emit('myEventDone', data, socket);
  });
};

// Export
module.exports.ingredientEvent = ingredientEvent;
module.exports.router = router;