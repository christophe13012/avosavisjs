
class enregistrerAvis{
    constructor(){
        this.enregistrerAvis();

    }

    ouvrirForm(element, resto){
        let _this = this;  
        element.addEventListener('click', function() {
            $('#nomRestoAvis').text(resto.restaurantName);
            $('#modalAvis').modal('hide');
            $('#modalCom').modal();
            outils.mise0Modal();
        })
    }

    enregistrerAvis(){
        let enregistrerAvis = document.getElementById('enregistrerAvis');
        // action à la validation du formulaire et donc de l'avis
        enregistrerAvis.addEventListener('click', function() {

            let note = $('#etoileNote').val();
            let avis = $('#avisTextarea').val();
            let nomResto = $('#nomRestoAvis').text();

            tableauResto.forEach(function (resto) {
                if(resto.restaurantName === nomResto){
                    resto.ratings.push({
                        stars: note,
                        comment: avis
                    })
                }
            })

            // on met à jour les notes
            tableauResto.forEach(function(resto, index) {
                restaurant.miseAJourNote(index, resto);
            })


        } )
    }}

let ajoutCom = new enregistrerAvis();

