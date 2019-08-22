class outil{
    constructor(){

    }
    mise0Modal(){
        $(".modal-body input").val("");
        $(".modal-body textarea").val("");
        $(".modal-body select").val("1");
    }
    bounce(marker){
        // supprime le bounce au dernier
        if (currentMarker) currentMarker.setAnimation(null);
        // on defini le nouveau
        currentMarker = marker;
        // ajout bounce
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    clignoterResto(index){
        tableauInfoResto.forEach(function (element) {
            element.elementHtml.firstChild.className = ''; 
        });
        tableauInfoResto[index].elementHtml.firstChild.className = 'clignotte';
    }
    scrollTo(index) {
        tableauInfoResto[index].elementHtml.scrollIntoView({behavior: "smooth", block: "start"});
    }
    dessinNote(element, note){
        for (let i = 0;  i < Math.floor(note);  i++) {
            let imgStar = document.createElement('img');
            imgStar.src = "icons/star.png";
            element.appendChild(imgStar);
        }
        if((note-(Math.floor(note)))>0.1){
            let imgStarSemi = document.createElement('img');
            imgStarSemi.src = "icons/star-half-empty.png";
            element.appendChild(imgStarSemi);
        }
    }
}

let outils = new outil();


