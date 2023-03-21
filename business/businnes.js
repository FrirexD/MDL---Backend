/*Importation des modules*/
const express = require("express");
const data = require("../data/data");

/**
 * @typedef {Object} user
 * @property {string} first
 * @property {string} last
 * @property {string} email
 * @property {string} company
 * @property {string} country
 * @property {number?} id 
 * @property {string?} date 
 */
//utilisation de regex101
const user_checker = {
    first: /^[A-Za-z-]+$/, //prénom
    last:/^[A-Za-z-]+$/, //nom
    email:/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,4}$/, //email
    company:/^[A-Za-z- ]+$/, //entreprise
    country:/^[A-Za-z- ]+$/ //pays
};

/**
 * Check if two arrays are equal 
 * @param {Array} a The first array 
 * @param {Array} b The second array 
 * @returns {Boolean} Are the array equal ?
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

};


/**
 * Check if the user is valid
 * @param {user} user The user 
 * @param {Boolean} Do we check all keys of the checker
 * @returns {Boolean} is the user valid ?
 */
const is_valid_user = (user, check_all_keys) => {
    let user_keys=Obejct.keys(user);
    let checker_keys = Object.keys(user_checker);

    //on regarde les clés de l'user donné
    if(check_all_keys && !are_array_equals(user_keys, checker_keys)){
        return false;
    }
    //on regarde le sous tableau de l'user donné
    if(!check_all_keys && !is_subarray_of(user_keys, checker_keys)){
        return false;
    }

    //on regarde si les paramètres sont valides
    let is_valid_user = Object.keys(user)
        .reduce(
            (acc, key) => (user[key].match(user_checker[key])!=null)&& acc,
            true
        );
    return is_valid_user;
}

/**
 * Check if the user is edited
 * @param {user} user The user 
 * @returns {Boolean} is the user edited ?
 */
const is_edited_user = user => {

}

/**
 * Check if the user is deleted
 * @param {user} user The user 
 * @returns {Boolean} is the user deleted ?
 */
const is_deleted_user = user => {
    
}

/*Fonctions exportées*/
const business_public = {
    /**
     * Get all users from database
     * @returns {user[]} All users from database
     */
    get_all_users : ()=> data.get_all_users(),
    /**
     * Add an user to database
     * @param {user} user the user to add
     * @returns {Boolean} is the user added to database ?
     */
    add_user : user =>{
        if(!is_valid_user(user, true)){
            return false;
        }
        
        return data.add_user(user);
    },
    /**
     * Edit an user in the database
     * @param {user} user the user to edit
     * @returns {Boolean} is the user edited in the database ?
     */
    edit_user : user =>{
        if(!(id in user)){
            return false;
        }
        // verifie que user id est bien un nombre
        if(typeof user.id != "number") {
            return false;
        }

        //vérif la sutructure
        if(!is_valid_user(user.to_edit, false)){
            return false;
        }
        return data.edit_user(user);
    },
    /**
     * Delete an user in the database
     * @param {id : number} user the user to delete
     * @returns {Boolean} is the user deleted in the database ?
     */
    delete_user : user =>{
        if(!(id in user)){
            return false;
        }
        // verifie que user id est bien un nombre
        if(typeof user.id != "number") {
            return false;
        }

        return data.delete_user(user);
    }

    
};


/*Exportation comme module */

module.exports = business_public;