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

        //requete de GET qui renvoie un json qui contient tous les utilisateurs
        app.get(RESQUEST_URL, (req , res ,next) => {
            res.json(buisness.get_all_users());
        });

        //requete de post ajoute un utilisateur dans la BDD
        app.post(RESQUEST_URL, (req , res ,next) => {
            let is_added= buisness.add_user(req.body);

            //renvoie les codes de réussite ou echec
            if(is_added){
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        });
        
        //requete de Edit user qui modifie l'utilisateur dans la BDD
        app.put(RESQUEST_URL, (req , res ,next) => {
            let is_edit= buisness.edit_user(req.body);

            //renvoie les codes de réussite ou echec
            if(is_edit){
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        });
        
        //
        app.delete(RESQUEST_URL, (req , res ,next) => {
            let is_delete= buisness.delete_user(req.body);

            //renvoie les codes de réussite ou echec
            if(is_delete){
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        });
        

        //starts listening the port 
        console.log(`App listening to port ${port} `)
    })}
};

// Exportation des module

module.exports = api; 