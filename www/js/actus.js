// AFFICHAGE RUBRIQUE ACTUS

// Changer le format de date
function formateDate(maDate) {
    const event = new Date(maDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return event.toLocaleDateString('fr-FR', options);
  }

// Récupérer données API


$(document).ready(function() {

    if(document.getElementById('menuActus')) {
        var restUrl = 'http://web.montpellier.epsi.fr/~siobhane.mouchez/wp-json/wp/v2/posts?categories=21';

        // Afficher la rubrique + cacher les autres rubriques
        document.querySelector("#menuActus").addEventListener('click', 
            function() {
                document.getElementById("news").style.display = 'block';
                document.getElementById("team").style.display = 'none';
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


                var bigString = 
                '<div class="wthree-news-left">'
                    + '<h4><span>' + formateDate(element.date) + '</span></h4>'
                + '</div>'
                + '<div class="date-text">'
                    + '<a data-toggle="modal">' + element.title.rendered + '<span class="blinking"><img src="images/new.png" alt="" /></span></a>'
                    + '<p>' + element.content.rendered + '</p>'
                + '</div>';

            $("#actus").append(bigString);

            });
        });
    }
})
