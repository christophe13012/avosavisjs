class filtre{
    constructor(){
        this.cliquer();
    }
    cliquer(){
        let _this = this;
        $("#sel1, #sel2").change(function() {
            if($('#sel1').val()>$('#sel2').val()){
                $('#erreurFiltre').text('Erreur dans le filtre, merci de modifier'); 
            } else {
                $('#erreurFiltre').text('');
                _this.trier();
            }

        });
    }

    trier(){
        let valeur1 = document.getElementById('sel1').value;
        let valeur2 = document.getElementById('sel2').value;

        tableauInfoResto.forEach(function (resto, index) {
            if((resto.moyenneNote >= valeur1)&&(resto.moyenneNote <= valeur2)&&(resto.surCarte === 'ok')){
                resto.elementHtml.style.display = 'block';
                // ajouter les marqueurs correspondants
                tableauMarkers[index].setVisible(true);

            } else {
                resto.elementHtml.style.display = 'none';
                // effacer les marqueurs correspondants
                tableauMarkers[index].setVisible(false);
            }
        })
    }
    trierGeoloc(){
        let _this = this;
        var bounds =  map.getBounds()
        var nord = bounds.getNorthEast().lat();
        var est = bounds.getNorthEast().lng();
        var sud = bounds.getSouthWest().lat();
        var ouest = bounds.getSouthWest().lng();
        tableauInfoResto.forEach(function (resto) {
            if((resto.long<est)&&(resto.long>ouest)&&(resto.lat<nord)&&(resto.lat>sud)){ 
                resto.surCarte = 'ok';
            } else {
                resto.surCarte = 'ko';
            }
        })
        _this.trier();
    }
}

let filtrer = new filtre();