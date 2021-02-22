// AFFICHAGE RUBRIQUE FAQ

$(document).ready(function() {

    if(document.getElementById('menuFaq')) {
        var restUrl = 'http://web.montpellier.epsi.fr/~siobhane.mouchez/wp-json/wp/v2/pages/?slug=faq';

        // Afficher la rubrique + cacher les autres rubriques
        document.querySelector("#menuFaq").addEventListener('click', 
            function() {
                document.getElementById("news").style.display = 'none';
                document.getElementById("team").style.display = 'none';
                document.getElementById("infosContainer").style.display = 'none';
                document.getElementById("events").style.display = 'none';
                document.getElementById("faqContainer").style.display = 'block';
                document.getElementById("indro").style.display = 'none';
                document.getElementById("mentionsContainer").style.display = 'none';
            }
        )
        
        // Créer l'affichage de la rubrique
        $.getJSON(restUrl, function(posts) {
            posts.forEach(function(element) {

                var contenuFaq = 
                '<div class="container">'
                    + '<div class="introduction-info">' + element.content.rendered + '</div>';
                + '</div>'

            $("#faq").append(contenuFaq);

            });
        });
    }
})
