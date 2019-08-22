let tableauResto = [];
let tableauNom = [];



class parcoursListe{
    constructor(){
        this.parcourir();
    }
    parcourir(){
        let _this = this;
        $.ajax({ type : 'GET',
                url: 'listeResto.json',
                dataType    : 'json',
                success: function(restos){ 
                    tableauResto = restos;
                    
                    restos.forEach(function (resto) {
                            tableauResto.push({
                                restaurantName: resto.name,
                                address: resto.address,
                                lat: resto.lat,
                                long: resto.long,
                                ratings:[
                                    {
                                        stars:resto.rating,
                                        comment:''
                                    }
                                ],
                                placeId: 0
                            })
                    })
                    tableauResto.forEach(function (resto) {
                        tableauNom.push(resto.restaurantName);   
                    });
                    // On insere les restos initiaux
                    tableauResto.forEach(function(resto, index) { 
                        restaurant.placerMarker(resto);
                        restaurant.ajouterRestoListe(index, resto);
                        restaurant.miseAJourNote(index, resto); 
                    }) 
                    let ajoutResto = new ajoutRestoCarte();
                    
                   
                }

               })
    }
}

let parcours = new parcoursListe();
