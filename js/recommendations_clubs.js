// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var glasgowLoc = {lat: 55.8577235, lng: -4.2619865}
var option = "city";
var club_marker = [];

var recommender1 = {}
var recommender2 = {}
var recommender3 = {}
var recommender4 = {}
var recommender5 = {}

function showRecommendations_club() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: glasgowLoc,
        zoom: 14,
        disableDefaultUI: true,
        gestureHandling: 'auto',
        clickableIcons: false
    });

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: glasgowLoc,
        radius: 10000,
        type: ['night_clubs']
    }, callbackClubs);
}

function callbackClubs(results, status) {
    var counter = 1;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            if (results.length > 9 && i<10){
                if (i<2) recommender1["restaurant"+counter++] = results[i];
                else if (i<4 && i>1) recommender2["restaurant"+counter++] = results[i];
                else if (i<6 && i>3) recommender3["restaurant"+counter++] = results[i];
                else if (i<8 && i>5) recommender4["restaurant"+counter++] = results[i];
                else if (i<10 && i>7) recommender5["restaurant"+counter++] = results[i];
                if( counter == 3 ) counter = 1;
            }

            if (option == "nearby"){
                createMarkerClubs(results[i],"restaurant");
            }
        }

        if (results.length < 9){
            recommender1["restaurant1"] = results[1];recommender1["restaurant2"] = results[2];
            recommender2["restaurant1"] = results[0];recommender2["restaurant2"] = results[1];
            recommender3["restaurant1"] = results[2];recommender3["restaurant2"] = results[0];
            recommender4["restaurant1"] = results[2];recommender4["restaurant2"] = results[0];
            recommender5["restaurant1"] = results[0];recommender5["restaurant2"] = results[1];
        }
        if (option == "city"){
            createMarkerClubs(recommender1['restaurant1'], "restaurant");
            createMarkerClubs(recommender1['restaurant2'], "restaurant");
            createMarkerClubs(recommender2['restaurant1'], "restaurant");
            createMarkerClubs(recommender2['restaurant2'], "restaurant");
            createMarkerClubs(recommender3['restaurant1'], "restaurant");
            createMarkerClubs(recommender3['restaurant2'], "restaurant");
            createMarkerClubs(recommender4['restaurant1'], "restaurant");
            createMarkerClubs(recommender4['restaurant2'], "restaurant");
            createMarkerClubs(recommender5['restaurant1'], "restaurant");
            createMarkerClubs(recommender5['restaurant2'], "restaurant");
        }
    }
}

function createMarkerClubs(place, type) {

    if(!place) return;

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: 'images/icons/icon-club.png',
        type: type
    });

    if (type == "restaurant"){
        club_marker.push(marker);
    }

    google.maps.event.addListener(marker, 'click', function() {
        $(".recommendation-card").css("bottom","10%");
        $(".menu-container").hide();
        if(place.photos){
            $(".place-info").html(
                "<div class='image-wrapper'>" +
                "<img class='place-image' src='"+place.photos[0].getUrl({'maxWidth': 1000, 'maxHeight': 300})+"'/>" +
                "</div>" +
                "<h1 class='place-name'>"+place.name+"</h1>"+
                "<div class='rating'>"+
                "<span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>"+
                "</div>"+
                "<p style='text-align: justify; padding: 10px'>Description of the place from Google Place API"+
                " This is an amazing place for lunch"+
                " Ranked in top 10 of Glasgow restaurants."+
                " Some other nice words about the place.</p>"+
                "<a class='btn get-directions' href='#'><i class='material-icons icon-direction'>directions</i><br/><p class='text-direction' >Get Direction</p></a>" +
                "</div>"
            );
        } else {
            $(".place-info").html(
                "<div class='image-wrapper'>" +
                "<img class='place-image' src='images/no-image.jpg'/>" +
                "</div>" +
                "<h1 class='place-name'>"+place.name+"</h1>"+
                "<div class='rating'>"+
                "<span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>"+
                "</div>"+
                "<p style='text-align: justify; padding: 10px'>Description of the place from Google Place API"+
                " This is an amazing place for lunch"+
                " Ranked in top 10 of Glasgow restaurants."+
                " Some other nice words about the place.</p>"+
                "<a class='btn get-directions' href='#'><i class='material-icons icon-direction'>stars</i><br/><p class='text-direction' style='margin-left: -14px' >Check In</p></a>" +
                "</div>"
            );
        }
        $(".place-info").show();
        // infowindow.setContent(place.name);
        // infowindow.open(map, this);
    });
}
