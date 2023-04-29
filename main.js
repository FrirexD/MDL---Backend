/*
fetch("/users",{ 
    method: "get"
}).then(res=>res.json())

// post

fetch("/users", {
    method: "post",
    headers:{
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({
        first: "jean",
        last: "Bombeuir",
        country : "fr",
        company: "saucice",
        email: "jean.bombeur@gmail.com"
    })
})

// valide

//put 
fetch("/users", {
    method: "put",
    headers:{
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({
        id:1,
        to_edit: {
            last: "Bombeur",
            email: "jean.bonbeur@gmail.com"
        }
    })
})


//valide

fetch("/users") , {
    method: "delete",
    headers:{
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({id:1})
}
*/

require("./presentation/api").start(3000);

