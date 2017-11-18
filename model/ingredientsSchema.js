'use strict';

const mongoose = require("mongoose");

/** 
 * Modèle de la base de données Manolita
**/
let ingredientsSchema = mongoose.Schema({
    nom: { type : String, unique : true }, 
    gram: Number, 
    prix: Number 
}); 

/**
 * Transform de receive price into cents
 * @return {number} price
 **/
ingredientsSchema.methods.IngtoCents = function(){
    this.prix = this.prix / 100;
    return this.prix;
};

 /**
  * Define "Pizza" as collection
  **/
let Ingredients = mongoose.model('Ingredients', ingredientsSchema);

module.exports = Ingredients;