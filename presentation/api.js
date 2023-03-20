//importation des modules


const express = require("express");
const buisness = require("../business/business.js")
const RESQUEST_URL = "/users";

// Initisation de l'application 

let app = express();

// API backend 
const api = {
    
    //start l'API sur le port 
    start : port => { app.listen(port, () => {
        // autorise l'utilisation des Json
        app.use(express.json());

        //Toutes les requetes
        app.get(RESQUEST_URL, buisness.get_all_users);
        app.post(RESQUEST_URL, buisness.add_user);
        app.put(RESQUEST_URL, buisness.edit_user);
        app.delete(RESQUEST_URL, buisness.delete_user);

        //starts listening the port 
        console.log(`App listening to port ${port} `)
    })}
};

// Exportation des module

module.exports = api; 