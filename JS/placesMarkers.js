class placesMarkers{
    constructor(){
        google.maps.event.addListener(map, 'bounds_changed', function() {

            var request = {
                bounds: map.getBounds(),
                type: ['restaurant']
            };
            let service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, function(results, status)  {
                if(status === 'OK'){

                    results.forEach(function(result){
                        // on verifie qu'il n'existe pas deja grace au tableauNom
                        if( tableauNom.indexOf(result.name) === -1)
                        {

                            tableauResto.push({
                                restaurantName: result.name,
                                address: result.vicinity,
                                lat: result.geometry.location.lat(),
                                long: result.geometry.location.lng(),
                                ratings:[
                                    {
                                        stars:result.rating,
                                        comment:''
                                    }
                                ],
                                placeId: result.place_id
                            })

                            // on ajoute ce nouveau resto : marker + liste + note
                            restaurant.placerMarker(tableauResto[(tableauResto.length-1)]);
                            restaurant.ajouterRestoListe((tableauResto.length-1), tableauResto[(tableauResto.length-1)]);
                            restaurant.miseAJourNote((tableauResto.length-1), tableauResto[(tableauResto.length-1)]);
                        }

                        tableauNom.push(result.name);


                    })
                }
                filtrer.trierGeoloc();

            });
        })
    }
}


let placeMarkersplaces = new placesMarkers();
