class ajoutRestoCarte{
    constructor(){
        this.ajoutMarker(); 
        this.ajoutDansListe();
    }

    ajoutMarker(){
        google.maps.event.addListener(map, 'click', function(event) {
            var imageResto = 'icons/resto.png';
            var marker = new google.maps.Marker({
                position: event.latLng, 
                map: map,
                icon: imageResto
            });
            // On lance l'animation
            outils.bounce(marker);
            let indiceMarker = tableauResto.length;
            tableauMarkers.push(marker);
            // click marker
            marker.addListener('click', function(){  
            //    map.setZoom(18);
                map.setCenter(marker.getPosition());
                outils.bounce(marker);
                outils.clignoterResto(indiceMarker);
                infoResto.avis(tableauResto[indiceMarker]);
                setTimeout(function(){ outils.scrollTo(indiceMarker); }, 1000);
            })
            $('#modalAjoutResto').modal();

            // supprime le marker si on quitte le modal sans enregistrer
            $('#modalAjoutResto').on('hidden.bs.modal', function () {
                if(tableauMarkers.length !== tableauResto.length){
                    tableauMarkers[(tableauMarkers.length-1)].setMap(null);
                    tableauMarkers.pop();
                }

            }) 
        })
    }
    ajoutDansListe(){
        let enregistrerResto = document.getElementById('enregistrerResto');
        enregistrerResto.addEventListener('click', function() {
            tableauResto.push({
                restaurantName: $('#nomNouveauResto').val(),
                address: $('#adresseNouveauResto').val(),
                lat: tableauMarkers[tableauMarkers.length-1].getPosition().lat(),
                long: tableauMarkers[tableauMarkers.length-1].getPosition().lng(),
                ratings:[
                    {
                        stars:$('#noteNouveauResto').val(),
                        comment:$('#avisNouveauResto').val()
                    }
                ]
            });
            restaurant.ajouterRestoListe((tableauResto.length-1), tableauResto[(tableauResto.length-1)]);
            restaurant.miseAJourNote((tableauResto.length-1), tableauResto[(tableauResto.length-1)]);
            outils.clignoterResto(tableauResto.length-1);
            //   filtrer.trier();
            filtrer.trierGeoloc();
            $('#modalAjoutResto').modal('hide');
            outils.mise0Modal();
        })
    }

}






