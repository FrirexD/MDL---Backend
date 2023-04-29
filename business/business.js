//Importation des modules
const express = require("express");
const data = require("../data/data");

/**
 * @typedef {Object} user 
 * @property {string} first Prenom  
 * @property {string} last Nom
 * @property {string} email Mail
 * @property {string} company Societe
 * @property {string} country Pays
 * @property {number?} id  id
 * @property {string?} created_at date
 */

//utilisation de regex
const user_checker = {
    first: /^[A-Za-z-]+$/, //prénom
    last:/^[A-Za-z-]+$/, //nom
    email:/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,4}$/, //email
    company:/^[A-Za-z- ]+$/, //entreprise
    country:/^[A-Za-z- ]+$/ //pays
};

/**
 * Regarde si deux tableau sont egaux
 * @param {Array} a 1er tableau 
 * @param {Array} b 2eme tableau 
 * @returns {Boolean} Validation
 */
const are_array_equals = (a, b) => JSON.stringify(a) == JSON.stringify(b);

/**
 * Check if one array is a subarray of another
 * @param {Array} a The subarray 
 * @param {Array} b the subarray
 * @returns {Boolean} Is a a subarray of b ?
 */
const is_subarray_of = (a,b) => {
    for(let elem of a ){
        if(b.indexOf(elem) == -1){
            return false;
        }
    }

    return true;
};


/**
 * validation de l'user
 * @param {user} user l'utilisateur 
 * @param {Boolean} Do verification des clees
 * @returns {Boolean} validation de l'user
 */
const is_valid_user = (user, check_all_keys) => {
    //init
    let user_keys=Object.keys(user).sort();
    let checker_keys = Object.keys(user_checker).sort();

    //on verif les clees
    if(check_all_keys && !are_array_equals(user_keys, checker_keys)){
        return false;
    }

    if(!check_all_keys && !is_subarray_of(user_keys, checker_keys)){
        return false;
    }

    //on regarde si les parametes sont valides
    let is_valid_user = user_keys.reduce(
            (acc, key) => (user[key].match(user_checker[key])!=null) && acc,
            true
        );
    return is_valid_user;
}

const business_public = {
    /**
     * recupère tous les utilisateurs
     * @returns {user[]}tous les users de la database
     */
    get_all_users : ()=> data.get_all_users(),
    /**
     * ajoute un user a la database
     * @param {user} user l'user
     * @returns {Boolean} validation
     */
    add_user : user =>{
        if(!is_valid_user(user, true)){
            return false;
        }
        
        return data.add_user(user);
    },
    /**
     * Edit de l'user dans la database
     * @param {id:number, to_edit: user} user l'utilisateur
     * @returns {Boolean} validation
     */
    edit_user : user => {
        //Verification de l'ID
        if(!("id" in user && "to_edit" in user)){
            return false;
        }

        //on verifie que l'ID est un nombre
        if((typeof user.id !== "number")){
            return false;
        }

        //on verifie la structure de l'user
        if(!is_valid_user(user.to_edit, false)){
            return false;
        }

        return data.edit_user(user);
    },
    /**
     * supprimer un user de la database
     * @param {id:number} user l'utilisateur
     * @returns {Boolean} validation
     */
    delete_user : user =>{
        if(!("id" in user)){
            return false;
        }

        //on verifie que l'ID est un nombre
        if((typeof user.id !== "number")){
            return false;
        }
        return data.delete_user(user.id);
    }

    
};


//Exportation
module.exports = business_public;