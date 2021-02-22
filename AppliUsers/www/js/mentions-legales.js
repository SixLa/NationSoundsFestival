// AFFICHAGE MENTIONS LEGALES

$(document).ready(function() {

    if(document.getElementById('menuMentions')) {
        var restUrl = 'http://web.montpellier.epsi.fr/~siobhane.mouchez/wp-json/wp/v2/pages/?slug=mentions-legales';

        // Afficher la rubrique + cacher les autres rubriques
        document.querySelector("#menuMentions").addEventListener('click', 
            function() {
                document.getElementById("news").style.display = 'none';
                document.getElementById("team").style.display = 'none';
                document.getElementById("infosContainer").style.display = 'none';
                document.getElementById("events").style.display = 'none';
                document.getElementById("faqContainer").style.display = 'none';
                document.getElementById("indro").style.display = 'none';
                document.getElementById("mentionsContainer").style.display = 'block';
            }
        )
        
        // Créer l'affichage de la rubrique
        $.getJSON(restUrl, function(posts) {
            posts.forEach(function(element) {

                var contenuMentions = 
                '<div class="container">'
                    + '<div class="introduction-info">' + element.content.rendered + '</div>';
                + '</div>'

            $("#mentionsLegales").append(contenuMentions);

            });
        });
    }
})
