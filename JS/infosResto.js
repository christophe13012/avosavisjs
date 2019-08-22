class infosResto{
    constructor(){
    }

    avis(resto){
        let _this = this;
        _this.ajoutPhoto(resto.lat, resto.long);
        let divAvis = document.getElementById('bodyAvis');
        // on efface les avis precedents
        divAvis.innerHTML = '';
        $('#moyenneDansInfo').html('');
        // On ajoute le nom du resto et l'adresse
        $('#nomResto').text(resto.restaurantName);  
        $('#adresseResto').text(resto.address); 

        // insertion bouton pour ajouter avis
        let boutonCom = document.createElement('button');
        boutonCom.id = 'boutonComInfo';
        boutonCom.setAttribute('type', 'button');
        boutonCom.className = "btn btn-primary btn-xs";
        boutonCom.textContent = 'Ajouter commentaire';

        // ajout action au bouton
        ajoutCom.ouvrirForm(boutonCom, resto);
        divAvis.appendChild(boutonCom);

        let pCiDessous =  document.createElement('p');
        pCiDessous.textContent = "Ci-dessous les derniers avis client :"
        divAvis.appendChild(pCiDessous)

        // total pour calculer la moyenne
        let totalStars = 0;

        // On ajoute les notes et commentaires au divAvis
        for (let i = (resto.ratings.length-1); i >= 0; i--) {
            let pAvis = document.createElement('p');
            let pComment = document.createElement('p');

            totalStars += Number(resto.ratings[i].stars);
            for (let j = 0;  j < Math.floor(resto.ratings[i].stars);  j++) {
                let imgStarModal = document.createElement('img');
                imgStarModal.src = "icons/star.png";
                pAvis.appendChild(imgStarModal);
            }
            pComment.textContent = resto.ratings[i].comment;
            pAvis.appendChild(pComment);
            divAvis.appendChild(pAvis);   
        }

        // ajout commentaires places
        if (resto.placeId !== 0){
            divAvis.lastChild.style.display = 'none';
            var request = {
                placeId: resto.placeId
            };
            var service = new google.maps.places.PlacesService(map);
            service.getDetails(request, function(place, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    let reviews = place.reviews;
                    reviews.forEach(function(review) {
                        let pAvis = document.createElement('p');
                        let pComment = document.createElement('p');
                        for (let j = 0;  j < Math.floor(review.rating);  j++) {
                            let imgStarModal = document.createElement('img');
                            imgStarModal.src = "icons/star.png";
                            pAvis.appendChild(imgStarModal);
                        }
                        pComment.textContent = review.text;
                        pAvis.appendChild(pComment);
                        divAvis.appendChild(pAvis);   
                    })
                }
            })
        }




        // On insere la moyenne du resto
        let moyenneStars = Math.round(2 * (totalStars/resto.ratings.length)) / 2;
        outils.dessinNote(document.getElementById('moyenneDansInfo'),moyenneStars);

        // tout est créé donc on affiche le modal
        $('#modalAvis').modal();
    }

    ajoutPhoto(lat, long){
        // utilisation de l'API google street view
        $('#streetView').attr('src',
                              "https://maps.googleapis.com/maps/api/streetview?size=600x300&location="+
                              lat+','+long+
                              "&heading=151.78&pitch=-0.76&key=AIzaSyBf4GOhxsge_3kuAKHKDDiWLVEbl6t-1dw"
                             )
    }
}

let infoResto = new infosResto();
