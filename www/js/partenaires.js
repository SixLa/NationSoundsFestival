// AFFICHAGE RUBRIQUE PARTENAIRES

$(document).ready(function() {

    if(document.getElementById('menuPart')) {
        var restUrl = 'http://web.montpellier.epsi.fr/~siobhane.mouchez/wp-json/wp/v2/posts/?slug=mecenes,partenaires-medias,partenaires-prives,partenaires-institutionnels';

        // Afficher la rubrique + cacher les autres rubriques
        document.querySelector("#menuPart").addEventListener('click', 
            function() {
                document.getElementById("news").style.display = 'none';
                document.getElementById("team").style.display = 'block';
                document.getElementById("infosContainer").style.display = 'none';
                document.getElementById("events").style.display = 'none';
                document.getElementById("faqContainer").style.display = 'none';
                document.getElementById("indro").style.display = 'none';
                document.getElementById("mentionsContainer").style.display = 'none';
            }
        )
        
        // Créer l'affichage de la rubrique
        $.getJSON(restUrl, function(posts) {
            posts.forEach(function(element) {

                var contenuPart = 
                    '<h2>' + element.title.rendered + '</h2>'
                    + '<div class="logosPart">' + element.content.rendered + '</div>';

            $("#partenaires").append(contenuPart);

            });
        });
    }
})
