//Importation des modules
const fs = require("fs");
const { get } = require("http");

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

//Init database
const DATABASE = __dirname + "/bdd.json";


/**
 * renvoie le dernier ID de la bdd
 * @param {user[]} users Tableau utilisateurs
 * @returns {number} Le dernier id des utilisateurs
 */
const get_last_index = users => Math.max(...users.map(user => user.id), 0);

/**
 * renvoie la database
 * @returns {user[]} tableau d'utilisateurs
 */
const read_database_file = () => JSON.parse(fs.readFileSync(DATABASE, "utf8"));

/**
 * Ecrit les utilisateurs dans la bdd
 * @param {user[]} users tableau d'utilisateurs
 */
const write_database_file = users => fs.writeFileSync(DATABASE, JSON.stringify(users), "utf8");



const data_public = {
    /**
     * recupere tous les user de la bdd
     * @returns {User[]} Tableau de tous les utilisateurs
     */
    get_all_users: () => read_database_file(),

    /**ajoute un utilisateur + verif
     * @param {user} User l'user qu'on veut ajouter
     * @returns {Boolean} validation de l'ajout
     */
    add_user: user => {
        let users;

        //test de lecture depuis la Database
        try{
            users = read_database_file();
        } catch {
            console.error("Couldn't read from database");
            return false;
        }
        user.id = get_last_index(users) + 1;
        user.created_at = new Date().toUTCString();

        //ajout de l'user
        users.push(user);

        //Ajout à la database et on renvoie la verification
        try{
            write_database_file(users);
        } catch {
            console.error("Couldn't write in database");
            return false;
        }

        write_database_file(users);

        return true;
    },

    edit_user: user => {
        let users;

        //test de lecture depuis la Database
        try{
            users = read_database_file();
        } catch {
            console.error("Couldn't read from database");
            return false;
        }

        let user_index = -1;
        for(let i = 0 ; i < users.length; i++)
        {
            if(users[i].id=== user.id)
            {
                user_index = i ;
            }
        
        }
        if(user_index==-1)
        {
            return false;
        }
        for(let key in user.to_edit)
        {
            users[user_index][key] = user.to_edit[key]
        }

        //Ajout à la database et on renvoie la verification
        try{
            write_database_file(users);
        } catch {
            console.error("Couldn't write in database");
            return false;
        }
        write_database_file(users);

        return true;
    },


    /**
     * Supprime un user de la database
     * @param {number} id l'ID de l'user
     * @returns {Boolean} verification
     */
    delete_user: id => {
        let users;

        //test de lecture depuis la Database
        try{
            users = read_database_file();
        } catch {
            console.error("Couldn't read from database");
            return false;
        }

        if(users.map(user => user.id).indexOf(id)==-1){
            return false;
        }
        //supprime l'user avec l'ID 
        users = users.filter(user => user.id != id);

        //Ajout à la database et on renvoie la verification
         try{
            write_database_file(users);
        } catch {
            console.error("Couldn't write in database");
            return false;
        }
        return true;
    }
}

//Exportation pour l'utilisation dans notre front
module.exports=data_public;