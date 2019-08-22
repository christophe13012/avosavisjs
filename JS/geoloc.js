class geoloc{
    constructor(){
         infoWindow = new google.maps.InfoWindow;
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                // on place une image personnelle comme icone
                var image = 'icons/placeholder.png';
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    map: map,
                    icon: image,
                    animation: google.maps.Animation.DROP
                });
                infoWindow.open(map);
                map.setCenter(marker.getPosition());


            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                                  'Error: The Geolocation service failed.' :
                                  'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        }


    }
}

let geolocSurPos = new geoloc();