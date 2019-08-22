var tableauMarkers = [];
// on créé un tableau qui nous servira pour les filtres
let tableauInfoResto = [];
// currentMarker pour bounce
var currentMarker = null;

class Restaurant{
    constructor(){
    }
    placerMarker(resto){
        var imageResto = 'icons/resto.png';    
        var markerResto = new google.maps.Marker({
            position: new google.maps.LatLng(resto.lat, resto.long),
            map: map,
            icon: imageResto,
            title: resto.restaurantName
        });

        tableauMarkers.push(markerResto);
        let indexMarker = (tableauMarkers.length-1);
        markerResto.addListener('click', function(){
            map.setCenter(markerResto.getPosition());
            infoResto.avis(resto);
            outils.bounce(markerResto);  
            outils.clignoterResto(indexMarker);
            setTimeout(function(){ outils.scrollTo(indexMarker); }, 1000);
        });
    }

    ajouterRestoListe(index, resto){
        let listeRestos = document.getElementById('restos');
        let divElt = document.createElement('div');
        divElt.id = 'restaurant';
        divElt.className = resto.restaurantName;

        // creation nom resto
        let pNom = document.createElement('p');
        pNom.id = "id" + index;
        let lienNom = document.createElement('a');
        lienNom.className = "text-primary lien" + index;
        lienNom.style.fontWeight = 'bold';
        lienNom.textContent = resto.restaurantName;
        lienNom.href = '#';

        // click sur nom resto pour avoir les infos
        lienNom.addEventListener('click', function(){
            map.setCenter(tableauMarkers[index].getPosition());
            infoResto.avis(resto);
            outils.bounce(tableauMarkers[index]); 
            outils.clignoterResto(index);
        })


        let pNote = document.createElement('p');
        let pAdresse = document.createElement('p');
        pAdresse.textContent = resto.address;
        let separation = document.createElement('hr');
        separation.id = 'sepListe';

        // insertion bouton pour ajouter avis
        let boutonCom = document.createElement('button');
        boutonCom.id = 'boutonCom';
        boutonCom.setAttribute('type', 'button');
        boutonCom.className = "btn btn-primary btn-xs";
        boutonCom.textContent = 'Ajouter commentaire';

        // ajout action au bouton
        ajoutCom.ouvrirForm(boutonCom, resto);

        // insertion des elements
        pNom.appendChild(lienNom);
        divElt.appendChild(pNom);
        divElt.appendChild(pAdresse);
        divElt.appendChild(pNote);
        divElt.appendChild(boutonCom);
        divElt.appendChild(separation);

        // On insere les infos dans le tableau
        tableauInfoResto.push({
            elementHtml: divElt,
            lat: resto.lat,
            long: resto.long,
            surCarte: ''
        });
        listeRestos.appendChild(divElt);
    }

    miseAJourNote(index, resto){
        let totalNotes = 0;
        let nombreNotes = resto.ratings.length;
        for (let i = 0; i < nombreNotes; i++) {
            totalNotes += Number(resto.ratings[i].stars);
        }
        // On arrondi la moyenne au 0.25 pres
        let moyStars = Math.round(2 * (totalNotes/nombreNotes)) / 2;

        // on met à jour la note
        tableauInfoResto[index].moyenneNote = moyStars;

        let restaurants = document.getElementById('restos');
        let restaurantEnfants = restaurants.childNodes;
        // on vide l'ancienne note et on remplace
        let restaurantEnfant = restaurantEnfants[index].childNodes;
        restaurantEnfant[2].innerHTML = '';
        outils.dessinNote(restaurantEnfant[2], moyStars);
        filtrer.trier();
    }
}

let restaurant = new Restaurant()
