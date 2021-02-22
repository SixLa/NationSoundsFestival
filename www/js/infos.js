// AFFICHAGE RUBRIQUE INFOS PRATIQUES

$(document).ready(function() {

    if(document.getElementById('menuInfos')) {
        var restUrl = 'http://web.montpellier.epsi.fr/~siobhane.mouchez/wp-json/wp/v2/pages/?slug=infos-pratiques';

        // Afficher la rubrique + cacher les autres rubriques
        document.querySelector("#menuInfos").addEventListener('click', 
            function() {
                document.getElementById("news").style.display = 'none';
                document.getElementById("team").style.display = 'none';
                document.getElementById("infosContainer").style.display = 'block';
                document.getElementById("events").style.display = 'none';
                document.getElementById("faqContainer").style.display = 'none';
                document.getElementById("indro").style.display = 'none';
                document.getElementById("mentionsContainer").style.display = 'none';
            }
        )
        
        // Créer l'affichage de la rubrique
        $.getJSON(restUrl, function(posts) {
            posts.forEach(function(element) {

                var contenuInfos = 
                '<div class="container">'
                    + '<div class="introduction-info">' + element.content.rendered + '</div>';
                + '</div>'

            $("#infos").append(contenuInfos);

            });
        });
    }
})
