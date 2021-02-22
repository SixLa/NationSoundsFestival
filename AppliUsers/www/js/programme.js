// AFFICHAGE RUBRIQUE PROGRAMME

function sceneSub(scene){
    sceneID = "scene"+scene;
    document.getElementById(sceneID).classList.add('active');
    console.log(sceneID);
}

function programmeFromHome(jour){
    displayFromHome();
    fetchData('',jour);
    navScene(0);
    jourId = "jour"+(jour[1]-1);
    console.log(jourId);
    document.getElementById(jourId).classList.add('active');
    document.getElementById("jour0").classList.remove('active');
}


function styleForMap(){
    console.log(1);
    styledisplay("events",'none');
    styledisplay("news",'none');
    styledisplay("team",'none');
    styledisplay("infosContainer",'none');
    styledisplay("faqContainer",'none');
    styledisplay("indro",'none');
    styledisplay("mentionsContainer",'none');
    styledisplay("mapIframe",'block');
}

function styleCloseMap(){
    styledisplay("events",'none');
    styledisplay("news",'none');
    styledisplay("team",'none');
    styledisplay("infosContainer",'none');
    styledisplay("faqContainer",'none');
    styledisplay("indro",'block');
    styledisplay("mentionsContainer",'none');
    styledisplay("mapIframe",'none');
}

function styledisplay(id,type){
    document.getElementById(id).style.display = type;
}

function displayFromHome(){
    styledisplay("events",'block');
    styledisplay("news",'none');
    styledisplay("team",'none');
    styledisplay("infosContainer",'none');
    styledisplay("faqContainer",'none');
    styledisplay("indro",'none');
    styledisplay("mentionsContainer",'none');
    styledisplay("mapIframe",'none');
}

// si 0 affiche les scenes , sinon les masques
function navScene(type){
    if(type == 0)
        document.getElementById("tabHidden").classList.remove("nav-hidden");
    else
        document.getElementById("tabHidden").classList.add("nav-hidden");
}

$(document).ready(function () {
    if (document.getElementById('programme')) {

        // Afficher la rubrique + cacher les autres rubriques + affichage de base de "TOUT"
        document.querySelector("#programme").addEventListener('click',
            function () {
                styledisplay("events",'block');
                styledisplay("news",'none');
                styledisplay("team",'none');
                styledisplay("infosContainer",'none');
                styledisplay("faqContainer",'none');
                styledisplay("indro",'none');
                navScene(1);
                fetchData('scene1,scene2,scene3','');
            }
        )
    }
})

function setRestUrl(scene, date){
    if (date == '' && scene !='') // TOUT
        return 'http://web.montpellier.epsi.fr/~siobhane.mouchez/wp-json/wp/v2/posts?filter[tag]=' + scene + '&filter[posts_per_page]=100';
    else if (date != '' && scene == '') // JOUR
        return 'http://web.montpellier.epsi.fr/~siobhane.mouchez/wp-json/wp/v2/posts?filter[tag]=' + date + '&filter[posts_per_page]=100';
    else // JOUR ET SCENE
        return 'http://web.montpellier.epsi.fr/~siobhane.mouchez/wp-json/wp/v2/posts?filter[tag]=' + scene + '%2B' + date + '&filter[posts_per_page]=100';
}

// tire la chasse d'eau de l'html
function flushInner(id){
    document.getElementById(id).innerHTML = "";
}

// remplir la chasse d'eau de l'html
function appendInner(id,content){
    $(id).append(content);
}

// afficher les catégories "scene"
function setSceneNav(date){
    flushInner("tabHidden");
    var tempSceneNav = 
        '<li role="presentation" id="scene1"><a href="#scene1" onClick="fetchData(\'scene1\',\'' + date + '\');sceneSub(1)" role="tab" id="scene1-tab" data-toggle="tab"'
        + 'aria-controls="learning">scene 1</a></li>'
        + '<li role="presentation" id="scene2"><a href="#scene2" onClick="fetchData(\'scene2\',\'' + date + '\');sceneSub(2)" role="tab" id="scene2-tab" data-toggle="tab"'
        + 'aria-controls="playing" >scene 2</a></li>'
        + '<li role="presentation" id="scene3"><a href="#scene3" onClick="fetchData(\'scene3\',\'' + date + '\');sceneSub(3)" role="tab" id="scene3-tab" data-toggle="tab"'
        + 'aria-controls="painting">scene 3</a></li>';
    appendInner("#tabHidden",tempSceneNav);
}

// afficher les données + modal 
function setDataContent(element){
    var tempData =
    '<div class="col-sm-3 w3_tab_img_left">'
    + '<div class="demo">'
    + '<a data-toggle="modal" data-target="#modal-'+element.slug+'" class="cm-overlay">'
    + '<figure id="img-'+element.featured_media+'" class="imghvr-shutter-in-out-diag-2">'
    + '</figure>'
    + '</a>'
    + '</div>'
    + '<div class="agile-gallery-info">'
    + '<h5>' + element.title.rendered + '</h5>'
    + '<p id="catName-' + element.slug + '"></p>'
    + '</div>'
    +'<div class="modal" id="modal-'+element.slug+'" tabindex="-1" role="dialog">'
    +'<div class="modal-dialog" role="document">'
    +'<div class="modal-content">'
    +'<div class="modal-header">'
    +'<h4 class="modal-title">' + element.title.rendered + '</h4>'
    +'</div>'
    +'<div class="modal-body"><div id="imgPh-'+element.slug+'"></div>' + element.content.rendered + ''
    +'</div>'
    +'<div class="modal-footer">'
    +'<button type="button" class="btn btn-primary" data-dismiss="modal">Fermer</button>'
    +'</div>'
    +'</div>'
    +'</div>'
    +'</div>';
    appendInner("#myTabContent", tempData);
}

// affiche l'image mise en avant
function setDataFeaturedImg(element){
    if( element.featured_media != 0){
        var imgRest = 'http://web.montpellier.epsi.fr/~siobhane.mouchez/wp-json/wp/v2/media/' + element.featured_media;
        $.getJSON(imgRest, function (outputImg){
            var imgOut = '<img src="'+outputImg.source_url+'" class="img-responsive">';
            appendInner('#img-' + element.featured_media + '',imgOut);
            appendInner('#imgPh-' + element.slug + '',imgOut);
        });
    }
}

// affiche les tags
function setDataTags(element){
    var slug = element.slug;

    element.tags.forEach(element => {
        var tempRest = 'http://web.montpellier.epsi.fr/~siobhane.mouchez/wp-json/wp/v2/tags/' + element;
        $.getJSON(tempRest, function (output) {
            if(isNaN(output.name))
                appendInner('#catName-' + slug + ''," " + output.name);
        });
    });
}

// récupére les données
function fetchData(scene, date) {
    flushInner("myTabContent");

    var restUrl = setRestUrl(scene, date);
    setSceneNav(date);

    $.getJSON(restUrl).done(function (posts) {
        posts.forEach(function (element) {
            setDataContent(element);
            setDataFeaturedImg(element);
            setDataTags(element);
        });
    });
}