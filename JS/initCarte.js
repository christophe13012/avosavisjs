var map, infoWindow;
function initMap() {


    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -43.300, lng: 5.400},
        zoom: 11
    });




    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }


    // ajout des fichiers JS au HTML

    let classes=["filtre", "enregistrerAvis", "restaurant", "ajoutRestoCarte", "parcoursListe", "outils", "infosResto", "placesMarkers", "geoloc"];


    for(let i = 0;i<classes.length;i++)
    {
        let sEl=document.createElement('script');
        sEl.src="JS/"+classes[i]+".js";
        document.body.appendChild(sEl);
    } 


}
