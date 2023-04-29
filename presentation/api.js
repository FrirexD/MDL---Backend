//impoetation des modules
const express = require("express");
const  cors =require("cors");
const business = require("../business/business");

//Init
let app = express();
const REQUESTS_URL="/users";

//api
const api = {
    /**
     * lance l'api sur un port donnee
     * @param {number} port le port
     */
    start: port=>{
        
        app.use(express.json());

        app.use(cors({
            origin: "*"
        }))

        
        /**
         * appel de la database
         * @param {number} REQUESTS_URL l'url d'appel
         */
        app.get(REQUESTS_URL, (req, res)=>{
            res.json(business.get_all_users());
        });

        
        /**
         * ajout dans la database
         * @param {number} REQUESTS_URL l'url d'appel
         */
        app.post(REQUESTS_URL, (req, res)=>{
            let is_added = business.add_user(req.body);

            if(is_added){
                res.sendStatus(200);
            } else{
                res.sendStatus(400);
            }
        });

        
        /**
         * 
         * edit dans la database
         * @param {number} REQUESTS_URL l'url d'appel
         */
        app.put(REQUESTS_URL, (req, res)=>{
            let is_edited = business.edit_user(req.body);

            if(is_edited){
                res.sendStatus(200);
            } else{
                res.sendStatus(400);
            }
        });

        /**
        * suprime de la database
        * @param {number} REQUESTS_URL l'url d'appel
        */
        app.delete(REQUESTS_URL, (req, res)=>{
            let is_deleted = business.delete_user(req.body);

            if(is_deleted){
                res.sendStatus(200);
            } else{
                res.sendStatus(400);
            }
        });

        app.listen(port, ()=>{
            console.log(`App listening to port ${port}`);
        });

        //debug
        app.use(express.static("public"));
    }
};


//Exportation de l'api
module.exports=api;