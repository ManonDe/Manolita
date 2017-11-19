'use strict';

const mongoose = require("mongoose");

 
 //Modèle de la base de données Manolita
 
let ingredientsSchema = mongoose.Schema({
    nom: { type : String, unique : true }, 
    gram: Number, 
    prix: Number 
}); 


 //Transforme le prix en centimes
 //@return {number} price
 
ingredientsSchema.methods.IngtoCents = function(){
    this.prix = this.prix / 100;
    return this.prix;
};

 
 //Définit les ingrédients comme une collection
  
let Ingredients = mongoose.model('Ingredients', ingredientsSchema);

module.exports = Ingredients;